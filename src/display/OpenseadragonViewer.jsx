
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import RefreshIcon from '@material-ui/icons/Refresh'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
const ReactDOM = require('react-dom')
const navigatorSize = 100
const $ = require('jquery')

const OpenseadragonViewer = createReactClass({
  propTypes: {
    image: PropTypes.object,
    containerID: PropTypes.string.isRequired,
    fullPage: PropTypes.bool,
    height: PropTypes.number,
    showNavigator: PropTypes.bool,
    showFullPageControl: PropTypes.bool,
    toolbarTop: PropTypes.number,
    toolbarLeft: PropTypes.number,
  },

  getDefaultProps: function () {
    return {
      height: 900,
      showNavigator: true,
      showFullPageControl: true,
      toolbarLeft: 10,
      toolbarTop: 10,
    }
  },

  getInitialState: function () {
    return {
      image: null,
      viewer: null,
    }
  },

  componentDidMount: function () {
    this.buildViewer(this.props.image)
  },

  shouldComponentUpdate: function (nextProps) {
    if (nextProps.fullPage) {
      this.fullPageOn()
    } else {
      this.fullPageOff()
    }

    if (nextProps.image !== this.props.image) {
      this.setState({ image: nextProps.image }, function () {
        this.state.viewer.close()
        this.openImage(this.state.viewer, nextProps.image)
      })
    }
    return true
  },

  openImage: function (viewer, image) {
    let sourceImage = this.dziSource(image)
    if (/^http:\/\/localhost/.test(image.contentUrl)) {
      sourceImage = this.legacySource(image)
    }
    viewer.viewport.defaultZoomLevel = this.defaultZoom(
      parseInt(image.width, 10),
      parseInt(image.height, 10),
      window.innerWidth,
      this.props.height)
    viewer.open(sourceImage)
  },

  fullPageOn: function () {
    if (this.state.viewer) {
      this.state.viewer.setFullPage(true)
      this.state.viewer.viewport.goHome()
      $(document).bind('keyup', this.state.escapeHandler)
    }
  },

  fullPageOff: function () {
    if (this.state.viewer) {
      this.state.viewer.setFullPage(false)
      $(document).unbind('keyup', this.state.escapeHandler)
    }
  },

  onHomePressed: function () {
    // seadragon doesn't reset rotation on home by default, we must do it manually
    if (this.state.viewer) {
      this.state.viewer.viewport.setRotation(0)
    }
  },

  buildViewer: function (image) {
    let options
    if (/^http:\/\/localhost/.test(image.contentUrl)) {
      options = this.legacyOptions(image)
    } else {
      options = this.dziOptions(image)
    }
    const viewer = OpenSeadragon(options) // eslint-disable-line no-undef
    const escapeHandler = function (event) {
      if (event.keyCode === 27) {
        this.fullPageOff()
      }
      return true
    }.bind(this)
    this.setState({
      image: image,
      viewer: viewer,
      escapeHandler: escapeHandler,
    }, this.openImage(viewer, image))

    viewer.addHandler('home', this.onHomePressed)
  },

  // Use with viewport.defaultZoomLevel.
  // If the image is larger than the viewport in width or height, returns 0 to allow
  // the viewport to fit the image within the bounds (the default behavior). If the
  // image is smaller than the viewport, returns a zoom that will render the image's native size.
  defaultZoom: function (imageWidth, imageHeight, viewportWidth, viewportHeight) {
    const widthRatio = imageWidth / viewportWidth
    const heightRatio = imageHeight / viewportHeight
    return Math.max(widthRatio, heightRatio) >= 1.0 ? 0 : widthRatio
  },

  baseOptions: function () {
    const toolbarDiv = 'toolbar-' + this.props.containerID
    const zoomInID = 'zoom-in-' + this.props.containerID
    const zoomOutID = 'zoom-out-' + this.props.containerID
    const homeID = 'home-' + this.props.containerID
    const fullID = 'full-page-' + this.props.containerID
    const leftID = 'left-' + this.props.containerID
    const rightID = 'right-' + this.props.containerID

    OpenSeadragon.setString('Tooltips.Home', 'Reset image') // eslint-disable-line no-undef

    const zoom = this.defaultZoom(
      parseInt(this.props.image.width, 10),
      parseInt(this.props.image.height, 10),
      window.innerWidth,
      this.props.height)

    return {
      id: this.props.containerID,
      element: ReactDOM.findDOMNode(),
      prefixUrl: '/openseadragon/',
      autoHideControls: false,
      defaultZoomLevel: zoom,
      showNavigator: this.props.showNavigator,
      showFullPageControl: this.props.showFullPageControl,
      navigatorHeight:   navigatorSize + 'px',
      navigatorWidth:    navigatorSize + 'px',
      navigatorPosition: 'ABSOLUTE',
      navigatorTop:      this.props.toolbarTop + 'px',
      navigatorLeft:     this.props.toolbarLeft + 'px',
      showRotationControl: true,
      immediateRender: false,
      toolbar: toolbarDiv,
      zoomInButton:   zoomInID,
      zoomOutButton:  zoomOutID,
      homeButton:     homeID,
      fullPageButton: fullID,
      rotateLeftButton: leftID,
      rotateRightButton: rightID,
      visibilityRatio: 0.5,
      springStiffness: 9,
      gestureSettingsMouse: {
        flickEnabled: true,
        flickMomentum: 0.2,
      },
      gestureSettingsTouch: {
        flickMomentum: 0.2,
      },
      animationTime: 2,
      maxZoomPixelRatio: 1.5,
    }
  },

  dziOptions: function () {
    const options = this.baseOptions()
    options.tileSources = this.dziSource
    return options
  },

  dziSource: function (image) {
    return image['thumbnail/dzi'].contentUrl
  },

  legacyOptions: function (image) {
    let options
    options = this.baseOptions()
    options.tileSources = this.legacySource(image)
    return options
  },

  legacySource: function (image) {
    return {
      id: image.id,
      type: 'legacy-image-pyramid',
      levels: [
        {
          url: image.contentUrl,
          height: parseInt(image.height, 10),
          width: parseInt(image.width, 10),
        },
      ],
    }
  },

  style: function () {
    let height = this.props.height
    if (this.props.showNavigator) {
      height -= 10
    }
    return {
      // height: "" + (this.props.height ? this.props.height : 600) + "px",
      height: height + 'px',
      overflow: 'hidden',
    }
  },

  toolbarStyle: function () {
    let top = this.props.toolbarTop
    if (this.props.showNavigator) {
      top += navigatorSize + 10
    }
    return {
      fontSize: '30px',
      top: top + 'px',
      left: this.props.toolbarLeft + 'px',
    }
  },

  renderButtons: function () {
    if (this.props.showNavigator) {
      const zoomInID = 'zoom-in-' + this.props.containerID
      const zoomOutID = 'zoom-out-' + this.props.containerID
      const homeID = 'home-' + this.props.containerID
      const fullID = 'full-page-' + this.props.containerID
      const leftID = 'left-' + this.props.containerID
      const rightID = 'right-' + this.props.containerID

      const nodes = [
        <a id={zoomInID} href='#zoom-in' key='zi' rel='nofollow'><ZoomInIcon className='material-icons' /></a>,
        <a id={zoomOutID} href='#zoom-out' key='zo' rel='nofollow'><ZoomOutIcon className='material-icons' /></a>,
        <a id={leftID} href='#rotate-left' key='lid' rel='nofollow'><RotateLeftIcon className='material-icons' /></a>,
        <a id={rightID} href='#rotate-right' key='rid' rel='nofollow'><RotateRightIcon className='material-icons' /></a>,
        <a id={homeID} href='#home' key='hid' rel='nofollow'><RefreshIcon className='material-icons' /></a>,
      ]
      if (this.props.showFullPageControl) {
        nodes.push(
          <a id={fullID} href='#full-page' key='fid' rel='nofollow'><FullscreenIcon className='material-icons' /></a>,
        )
      }
      return nodes
    }
    return null
  },

  render: function () {
    const toolbarID = 'toolbar-' + this.props.containerID

    return (
      <div className='hc-openseadragon-viewer' id={this.props.containerID} style={this.style()}>
        <div id={toolbarID} className='os-toolbar' style={this.toolbarStyle()}>
          {this.renderButtons()}
        </div>
      </div>
    )
  },
})

export default OpenseadragonViewer
