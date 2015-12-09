'use strict'
var React = require("react");
var ReactDOM = require("react-dom");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var MediaQuery = require('react-responsive');

var maxShowcaseHeight = 840;
var showcaseTitleHeight = 125;
var scrollPadding = 80;
var titleSectionWidthPercent = 0.85;
var minBackgroundBlur = 0.3;
var maxBackgroundBlur = 0.8;

var ShowcaseShow = React.createClass({
  mixins: [CollectionUrlMixin, BrowserMixin, LoadRemoteMixin ],
  displayName: "Showcase Show",
  propTypes: {
    collection: React.PropTypes.object,
    showcase: React.PropTypes.object,
    height: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      titleSectionPercentVisible: 1,
      startTime: Date.now(),
      hasScrolled: false,
      outerElement: null,
      element: null,
      currentSection: null,
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (!this.scrollbarInitialized) {
      this.initializeScrollbar();
    }
    if (this.props.height != prevProps.height) {
      this.updateScrollbar();
    }
    if(this.state.hasScrolled != prevState.hasScrolled) {
      this.updateScrollbar();
    }
  },

  initializeScrollbar: function() {
    this.scrollbarInitialized = true;
    this.state.outerElement.perfectScrollbar({useBothWheelAxes: true, suppressScrollY: true });
    if(this.ie() || this.ios()) {
      this.state.outerElement.find(".ps-scrollbar-x-rail").hide();
    }
  },

  updateScrollbar: function() {
    if (this.scrollbarInitialized) {
      this.state.outerElement.perfectScrollbar("update");
      if(this.ie() || this.ios()) {
        this.state.outerElement.find(".ps-scrollbar-x-rail").hide();
      }
    }
  },

  componentDidMount: function() {
    this.setState({
      outerElement: $(this.refs.showcaseOuter),
      element: $(ReactDOM.findDOMNode(this)),
    });
  },

  componentWillUnmount: function() {
    window.removeEventListener("hashchange", this.checkHash);
    // .rwindowemoveEventListener("resize", this.handleResize);
    document.body.style.backgroundImage = null;
  },

  setCurrentSection: function(section) {
    this.setState({currentSection: section});
  },

  removeCurrentSection: function () {
    this.setState({currentSection: null});
  },

  styleOuter: function(height) {
    return {
      position: "relative",
      overflowY: "hidden",
      overflowX: "hidden",
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      height: height + "px",
    };
  },

  transparent: function() {
    return {
      backgroundColor:'transparent',
    };
  },

  componentWillMount: function(){
    document.body.className = document.body.className + " showcase-bg";
    EventEmitter.on("SectionDialogWindow", this.setCurrentSection);
    EventEmitter.on("HideSectionDialogWindow", this.removeCurrentSection);
    if(window.location.hash) {
      var url = this.remoteUrlBase() + "sections/" + window.location.hash.replace("#", "");
      this.loadRemoteSection(url);
    }
  },

  onScroll: function() {
    if(!this.state.hasScrolled) {
      this.setState({hasScrolled: true});
    }
    var scrollLeft = this.state.outerElement.get(0).scrollLeft;
    var titleWidth = this.state.element.width() * titleSectionWidthPercent;
    var percentVisible = 1 - scrollLeft/titleWidth;
    if (percentVisible < 0) {
      percentVisible = 0;
    } else {
      percentVisible = Math.round(percentVisible * 100) / 100;
    }
    if (percentVisible != this.state.titleSectionPercentVisible) {
      this.setState({
        titleSectionPercentVisible: percentVisible,
      });
    }
  },

  render: function() {
    var showcaseHeight = this.props.height - showcaseTitleHeight;
    if (showcaseHeight > maxShowcaseHeight) {
      showcaseHeight = maxShowcaseHeight;
    }
    var showcaseInnerHeight = showcaseHeight - scrollPadding;

    var scroller = (<Scroller target="#showcase-outer" height={this.props.height} />);


    var backgroundBlur = 1 - this.state.titleSectionPercentVisible;
    if (backgroundBlur < minBackgroundBlur) {
      backgroundBlur = minBackgroundBlur;
    } else if (backgroundBlur > maxBackgroundBlur) {
      backgroundBlur = maxBackgroundBlur;
    }

    var prev, next;
    if(this.state.currentSection){
      if(this.state.currentSection.previousSection) {
        prev = this.state.currentSection.previousSection['@id'];
      }
      if(this.state.currentSection.nextSection) {
        next = this.state.currentSection.nextSection['@id'];
      }
    }

    // overwrite some stuff for iOS. TODO: Android
    if(this.ios()){
      showcaseHeight = window.screen.height;
      showcaseInnerHeight = Math.floor(window.screen.height * 0.9);
      scroller = null;
    }

    return (
      <div>
        <AttentionHelp start={this.state.startTime} hasScrolled={this.state.hasScrolled} />
        <ShowcaseBackground percentBlur={backgroundBlur} height={this.props.height} showcase={this.props.showcase} />
        <SectionShow
            section={this.state.currentSection}
            height={this.props.height}
            previousUrl={prev}
            nextUrl={next}
        />
        <MediaQuery minHeight={700}>
          <ShowcaseTitleBar percentFade={this.state.titleSectionPercentVisible} height={showcaseTitleHeight} showcase={this.props.showcase} />
        </MediaQuery>
        <ReactCSSTransitionGroup
          transitionName="showcase-slide-in"
          transitionAppear={true}
          transitionAppearTimeout={2600}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}>
          <div id="showcase-outer" ref="showcaseOuter" className="showcase-outer" style={this.styleOuter(showcaseHeight)} onScroll={this.onScroll}>
            {scroller}
            <ShowcaseInnerContent height={showcaseInnerHeight} showcase={this.props.showcase} />
          </div>
        </ReactCSSTransitionGroup>
        <CollectionHomeButton collection={this.props.collection}/>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseShow;
