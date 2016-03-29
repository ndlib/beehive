'use strict'
import '../../assets/scripts/perfect-scrollbar.jquery.js';

var React = require("react");
var ReactDOM = require('react-dom')
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var MediaQuery = require('react-responsive');

var maxShowcaseHeight = 805;
var showcaseTitleHeight = 35;
var scrollPadding = 80;
var titleSectionWidthPercent = 0.85;
var minBackgroundBlur = 0.3;
var maxBackgroundBlur = 0.8;

var EventEmitter = require('../../middleware/EventEmitter.js');
var ShowcaseTitleBar = require('./ShowcaseTitleBar.jsx');
var ShowcaseBackground = require('./ShowcaseBackground.jsx');
var AttentionHelp = require('../../other/AttentionHelp.jsx');
var SectionShow = require('./SectionShow.jsx');
var ShowcaseInnerContent = require('./ShowcaseInnerContent.jsx');
var Scroller = require('../../other/Scroller.jsx');
var OpenItemDisplay = require('../../modules/OpenItemDisplay.js');
var CollectionHomeButton  = require('./CollectionHomeButton.jsx');

var ShowcaseShow = React.createClass({
  mixins: [
    require('../../mixins/CollectionUrlMixin.jsx'),
    require('../../mixins/BrowserMixin.jsx'),
    require('../../mixins/LoadRemoteMixin.jsx')
  ],
  propTypes: {
    collection: React.PropTypes.object,
    showcase: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      titleSectionPercentVisible: 1,
      startTime: Date.now(),
      hasScrolled: false,
      outerElement: null,
      element: null,
      currentSection: null,
      width: window.innerWidth,
      height: window.innerHeight,
      mobile: this.mobile(),
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (!this.scrollbarInitialized) {
      this.initializeScrollbar();
    }
    if(this.state.hasScrolled != prevState.hasScrolled) {
      this.updateScrollbar();
    }
  },

  initializeScrollbar: function() {
    this.scrollbarInitialized = true;
    this.state.outerElement.perfectScrollbar({useBothWheelAxes: true, suppressScrollY: true });
    if(this.ie() || this.state.mobile) {
      this.state.outerElement.find(".ps-scrollbar-x-rail").hide();
    }
  },

  updateScrollbar: function() {
    if (this.scrollbarInitialized) {
      this.state.outerElement.perfectScrollbar("update");
      if(this.ie() || this.state.mobile) {
        this.state.outerElement.find(".ps-scrollbar-x-rail").hide();
      }
    }
  },

  handleResize: function() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      mobile: this.mobile(),
    });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
    this.setState({
      outerElement: $(this.refs.showcaseOuter),
      element: $(ReactDOM.findDOMNode(this)),
    });
  },

  componentWillUnmount: function() {
    window.removeEventListener("hashchange", this.checkHash);
    window.removeEventListener('resize', this.handleResize);
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

    var id;
    var url;
    if(window.location.search != null) {
      id = window.location.search.replace("?section=", "");
      url = this.remoteUrlBase() + "sections/" + id;
      OpenItemDisplay(id, 'section');
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
    var showcaseHeight = this.state.height - showcaseTitleHeight;
    if (showcaseHeight > maxShowcaseHeight) {
      showcaseHeight = maxShowcaseHeight;
    }
    var showcaseInnerHeight = showcaseHeight - scrollPadding;

    var scroller = (<Scroller target="#showcase-outer" height={showcaseHeight} />);
    var titleBar = (
      <ShowcaseTitleBar
        percentFade={this.state.titleSectionPercentVisible}
        height={showcaseTitleHeight}
        showcase={this.props.showcase}
      />
    );

    // overwrite some stuff for iOS. TODO: Android
    var mobileHomeButton;
    if(this.state.mobile){
      showcaseHeight = this.state.height * 0.95;
      showcaseInnerHeight = Math.floor(showcaseHeight * 0.95);
      scroller = null;
      mobileHomeButton = (<CollectionHomeButton collection={this.props.collection}/>);
      showcaseHeight = this.state.height;
    }
    if(this.state.mobile || this.state.height < 960){
      titleBar = null;
    }

    // background stuff
    var backgroundBlur = 1 - this.state.titleSectionPercentVisible;
    if (backgroundBlur < minBackgroundBlur) {
      backgroundBlur = minBackgroundBlur;
    } else if (backgroundBlur > maxBackgroundBlur) {
      backgroundBlur = maxBackgroundBlur;
    }


    // next/previous
    var prev, next;
    if(this.state.currentSection){
      if(this.state.currentSection.previousSection) {
        prev = this.state.currentSection.previousSection['@id'];
      }
      if(this.state.currentSection.nextSection) {
        next = this.state.currentSection.nextSection['@id'];
      }
    }

    return (
      <div style={{height: showcaseHeight}}>
        <AttentionHelp start={this.state.startTime} hasScrolled={this.state.hasScrolled} />
        <ShowcaseBackground percentBlur={backgroundBlur} height={this.state.mobile ? this.state.height : this.state.height - scrollPadding} showcase={this.props.showcase} />
        <SectionShow
            section={this.state.currentSection}
            height={this.state.mobile ? window.innerHeight : window.innerHeight - showcaseTitleHeight}
            previousUrl={prev}
            nextUrl={next}
        />
        {titleBar}
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
        {mobileHomeButton}
      </div>
    );
  }
});

module.exports = ShowcaseShow;
