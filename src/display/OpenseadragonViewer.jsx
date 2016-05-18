'use strict'
import '../assets/scripts/openseadragon.js';

var React = require('react');
var ReactDOM = require('react-dom');

var navigatorSize = 100;

var OpenseadragonViewer = React.createClass({
  propTypes: {
    image: React.PropTypes.object,
    containerID: React.PropTypes.string.isRequired,
    fullPage: React.PropTypes.bool,
    height: React.PropTypes.number,
    showNavigator: React.PropTypes.bool,
    showFullPageControl: React.PropTypes.bool,
    toolbarTop: React.PropTypes.number,
    toolbarLeft: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      height: 900,
      showNavigator: true,
      showFullPageControl: true,
      toolbarLeft: 10,
      toolbarTop: 10,
    };
  },

  getInitialState: function() {
    return {
      image: null,
      viewer: null,
    };
  },

  componentDidMount: function() {
    this.buildViewer(this.props.image);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.fullPage) {
      this.fullPageOn();
    } else {
      this.fullPageOff();
    }

    if(nextProps.image != this.props.image) {
      this.setState({image: nextProps.image}, function() {
        this.state.viewer.close();
        this.openImage(this.state.viewer, nextProps.image);
      });
    }
    return true;
  },

  openImage: function(viewer, image) {
    var sourceImage = this.dziSource(image);
    if (/^http:\/\/localhost/.test(image.contentUrl)) {
      sourceImage = this.legacySource(image);
    }
    viewer.viewport.defaultZoomLevel = this.defaultZoom(parseInt(image.width), parseInt(image.height), window.innerWidth, this.props.height);
    viewer.open(sourceImage);
  },

  fullPageOn: function() {
    if (this.state.viewer) {
      this.state.viewer.setFullPage(true);
      this.state.viewer.viewport.goHome();
      $(document).bind('keyup', this.state.escapeHandler);
    }
  },

  fullPageOff: function() {
    if (this.state.viewer) {
      this.state.viewer.setFullPage(false);
      $(document).unbind('keyup', this.state.escapeHandler);
    }
  },

  buildViewer: function(image) {
    var options;
    if (/^http:\/\/localhost/.test(image.contentUrl)) {
      options = this.legacyOptions(image);
    } else {
      options = this.dziOptions(image);
    }
    var viewer = OpenSeadragon(options);
    var escapeHandler = function(event) {
      if (event.keyCode === 27) {
        this.fullPageOff();
      }
      return true;
    }.bind(this)
    this.setState({
      image: image,
      viewer: viewer,
      escapeHandler: escapeHandler,
    }, this.openImage(viewer, image));

    var disableKeyboard = function(event) {
      event.eventSource.keyDownHandler = null;
      event.eventSource.keyUpHandler = null;
      event.eventSource.keyHandler = null;
    }
    viewer.addViewerInputHook({hooks: [
        {tracker: 'viewer', handler: 'clickHandler', hookHandler: disableKeyboard}
    ]});

  },

  // Use with viewport.defaultZoomLevel.
  // If the image is larger than the viewport in width or height, returns 0 to allow
  // the viewport to fit the image within the bounds (the default behavior). If the
  // image is smaller than the viewport, returns a zoom that will render the image's native size.
  defaultZoom: function(imageWidth, imageHeight, viewportWidth, viewportHeight) {
    var widthRatio = imageWidth / viewportWidth;
    var heightRatio = imageHeight / viewportHeight;
    return Math.max(widthRatio, heightRatio) >= 1.0 ? 0 : widthRatio;
  },

  baseOptions: function() {
    var toolbarDiv = 'toolbar-' + this.props.containerID;
    var zoomInID = 'zoom-in-' + this.props.containerID;
    var zoomOutID = 'zoom-out-' + this.props.containerID;
    var homeID = 'home-' + this.props.containerID;
    var fullID = 'full-page-' + this.props.containerID;
    var leftID = 'left-' + this.props.containerID;
    var rightID = 'right-' + this.props.containerID;

    OpenSeadragon.setString("Tooltips.Home","Reset image");

    var zoom = this.defaultZoom(parseInt(this.props.image.width), parseInt(this.props.image.height), window.innerWidth, this.props.height);

    return {
      id: this.props.containerID,
      element: ReactDOM.findDOMNode(),
      prefixUrl: "/openseadragon/",
      autoHideControls: false,
      defaultZoomLevel: zoom,
      showNavigator: this.props.showNavigator,
      showFullPageControl: this.props.showFullPageControl,
      navigatorHeight:   navigatorSize + 'px',
      navigatorWidth:    navigatorSize + 'px',
      navigatorPosition: "ABSOLUTE",
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
        flickMomentum: 0.2
      },
      animationTime: 2,
      maxZoomPixelRatio: 1.5,
    };
  },

  dziOptions: function(image) {
    var options;
    options = this.baseOptions();
    options.tileSources = this.dziSource;
    return options;
  },

  dziSource: function(image) {
    return image['thumbnail/dzi']['contentUrl'];
  },

  legacyOptions: function(image) {
    var options;
    options = this.baseOptions();
    options.tileSources = this.legacySource(image);
    return options;
  },

  legacySource: function(image) {
    return {
      id: image.id,
      type: 'legacy-image-pyramid',
      levels: [
        {
          url: image.contentUrl,
          height: parseInt(image.height),
          width: parseInt(image.width)
        }
      ]
    };
  },

  style: function() {
    var height = this.props.height;
    if (this.props.showNavigator) {
      height -= 10;
    }
    return {
      //height: "" + (this.props.height ? this.props.height : 600) + "px",
      height: height + "px",
      overflow: 'hidden',
    };
  },

  toolbarStyle: function() {
    var top = this.props.toolbarTop;
    if (this.props.showNavigator) {
      top += navigatorSize + 10;
    }
    return {
      fontSize: '30px',
      top: top + 'px',
      left: this.props.toolbarLeft + 'px',
    };
  },

  render: function() {
    var fullPageControl;
    var toolbarID = 'toolbar-' + this.props.containerID;
    var zoomInID = 'zoom-in-' + this.props.containerID;
    var zoomOutID = 'zoom-out-' + this.props.containerID;
    var homeID = 'home-' + this.props.containerID;
    var fullID = 'full-page-' + this.props.containerID;
    var leftID = 'left-' + this.props.containerID;
    var rightID = 'right-' + this.props.containerID;
    if (this.props.showFullPageControl) {
      fullPageControl = (
        <a id={fullID} href="#full-page"><i className="material-icons">fullscreen</i></a>
      );
    }
    return (
      <div className="hc-openseadragon-viewer" id={this.props.containerID} style={this.style()}>
        <div id={toolbarID} className="os-toolbar" style={this.toolbarStyle()}>
          <a id={zoomInID} href="#zoom-in"><i className="material-icons">zoom_in</i></a>
          <a id={zoomOutID} href="#zoom-out"><i className="material-icons">zoom_out</i></a>
          <a id={leftID} href="#rotate-left"><i className="material-icons">rotate_left</i></a>
          <a id={rightID} href="#rotate-right"><i className="material-icons">rotate_right</i></a>
          <a id={homeID} href="#home"><i className="material-icons">refresh</i></a>
          {fullPageControl}
        </div>
        <div ></div>
      </div>
    );
  }
});

module.exports = OpenseadragonViewer;
