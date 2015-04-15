//app/assets/javascripts/components/OpenseadragonViewer.jsx
var React = require('react');

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
      height: 600,
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
    return true;
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
    });

    var disableKeyboard = function(event) {
      event.eventSource.keyDownHandler = null;
      event.eventSource.keyUpHandler = null;
      event.eventSource.keyHandler = null;
    }
    viewer.addViewerInputHook({hooks: [
        {tracker: 'viewer', handler: 'clickHandler', hookHandler: disableKeyboard}
    ]});
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
    return {
      id: this.props.containerID,
      element: this.getDOMNode(),
      prefixUrl: "/openseadragon/",
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
      }
    };
  },

  dziOptions: function(image) {
    var options;
    options = this.baseOptions();
    options.tileSources = image['thumbnail/dzi']['contentUrl'];
    return options;
  },

  legacyOptions: function(image) {
    //console.log(image);
    var options;
    options = this.baseOptions();
    options.tileSources = {
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
    return options;
  },

  style: function() {
    return {
      height: "" + (this.props.height ? this.props.height : 600) + "px",
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
        <a id={fullID} href="#full-page"><i className="mdi-navigation-fullscreen"></i></a>
      );
    }
    return (
      <div className="hc-openseadragon-viewer" id={this.props.containerID} style={this.style()}>
        <div id={toolbarID} className="os-toolbar" style={this.toolbarStyle()}>
          <a id={zoomInID} href="#zoom-in"><i className="mdi-content-add"></i></a>
          <a id={zoomOutID} href="#zoom-out"><i className="mdi-content-remove"></i></a>
          <a id={leftID} href="#rotate-left"><i className="mdi-image-rotate-left"></i></a>
          <a id={rightID} href="#rotate-right"><i className="mdi-image-rotate-right"></i></a>
          <a id={homeID} href="#home"><i className="mdi-navigation-refresh"></i></a>
          {fullPageControl}
        </div>
        <div ></div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = OpenseadragonViewer;
