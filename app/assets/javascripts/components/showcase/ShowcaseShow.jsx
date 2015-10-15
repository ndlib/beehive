//app/assets/javascripts/components/ShowcaseShow.jsx
var React = require("react");

var maxShowcaseHeight = 840;
var showcaseTitleHeight = 40;
var scrollPadding = 80;
var titleSectionWidthPercent = 0.85;
var minBackgroundBlur = 0.3;
var maxBackgroundBlur = 0.8;

var ShowcaseShow = React.createClass({
  mixins: [CollectionUrlMixin, IEMixin, PageHeightMixin, LoadRemoteMixin],
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
  },

  initializeScrollbar: function() {
    this.scrollbarInitialized = true;
    this.state.outerElement.perfectScrollbar({useBothWheelAxes: true, suppressScrollY: true });
    if(this.ie()) {
      this.state.outerElement.find(".ps-scrollbar-x-rail").hide();
    }
  },

  updateScrollbar: function() {
    if (this.scrollbarInitialized) {
      this.state.outerElement.perfectScrollbar("update");
      if(this.ie()) {
        this.state.outerElement.find(".ps-scrollbar-x-rail").hide();
      }
    }
  },

  componentDidMount: function() {
    this.setState({
      outerElement: $(React.findDOMNode(this.refs.showcaseOuter)),
      element: $(React.findDOMNode(this)),
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

  componentWillMount: function(){
    document.body.className = document.body.className + " showcase-bg";
    EventEmitter.on("SectionDialogWindow", this.setCurrentSection);
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
    return (
      <div>
        <AttentionHelp start={this.state.startTime} hasScrolled={this.state.hasScrolled} />
        <ShowcaseBackground percentBlur={backgroundBlur} height={this.props.height} showcase={this.props.showcase} />
        <ShowcaseTitleBar percentFade={this.state.titleSectionPercentVisible} height={showcaseTitleHeight} showcase={this.props.showcase} />
        <div id="showcase-outer" ref="showcaseOuter" className="showcase-outer" style={this.styleOuter(showcaseHeight)} onScroll={this.onScroll}>
          <Scroller target="#showcase-outer" />
          <DialogWindow
            previousUrl={prev}
            nextUrl={next}
          >
            <SectionShow
              section={this.state.currentSection}
              height={this.state.height}
            />
          </DialogWindow>
          <ShowcaseInnerContent height={showcaseInnerHeight} showcase={this.props.showcase} />
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseShow;
