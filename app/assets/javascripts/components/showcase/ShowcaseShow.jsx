//app/assets/javascripts/components/ShowcaseShow.jsx
var React = require('react');

var maxShowcaseHeight = 840;
var showcaseTitleHeight = 40;
var scrollPadding = 40;
var titleSectionWidthPercent = 0.75;

var ShowcaseShow = React.createClass({
  displayName: 'Showcase Show',
  propTypes: {
    showcase: React.PropTypes.object,
    height: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      scrollOffsetLeft: 0,
      titleSectionPercentVisible: 1,
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.showcase && !this.scrollbarInitialized) {
      setTimeout(this.initializeScrollbar, 1000);
    }
    this.checkHash();
    if (this.props.height != prevProps.height) {
      this.updateScrollbar();
    }
  },

  initializeScrollbar: function() {
    this.scrollbarInitialized = true;
    $('#showcase-outer').perfectScrollbar({useBothWheelAxes: true, suppressScrollY: true });
  },

  updateScrollbar: function() {
    if (this.scrollbarInitialized) {
      $('#showcase-outer').perfectScrollbar('update');
    }
  },

  componentDidMount: function() {
    window.addEventListener("hashchange", this.checkHash, false);
    // window.addEventListener('resize', this.handleResize, false);
    this.checkHash();
  },

  componentWillUnmount: function() {
    window.removeEventListener('hashchange', this.checkHash);
    // .rwindowemoveEventListener('resize', this.handleResize);
    document.body.style.backgroundImage = null;
  },

  checkHash: function() {
    $(".modal").modal("hide");
    if(window.location.hash) {
      $(window.location.hash).modal('show');
    }
  },

  styleInner: function(height) {
    return {
      position: 'absolute',
      height: height + 'px',
      top: 0,
      left: 0,
      overflowX: 'visible',
      overflowY: 'visible',
    };
  },

  styleOuter: function(height) {
    return {
      position: 'relative',
      overflowY: 'hidden',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      height: height + 'px',
      top: 0,
      left: 0,

      padding: '10px',
      // marginBottom: '2em',

      //backgroundImage: 'url(' + this.props.showcase.image.contentUrl + ')',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
    };
  },

  componentWillMount: function(){
    document.body.className = "showcase-bg";
  },

  onScroll: function() {
    var scrollLeft = $("#showcase-outer").get(0).scrollLeft;
    var titleWidth = $(this.getDOMNode()).width() * titleSectionWidthPercent;
    var percentVisible = 1 - scrollLeft/titleWidth;
    if (percentVisible < 0) {
      percentVisible = 0;
    }
    this.setState({
      scrollOffsetLeft: scrollLeft,
      titleSectionPercentVisible: percentVisible,
    });
  },

  render: function() {
    var showcaseHeight = this.props.height - showcaseTitleHeight;
    if (showcaseHeight > maxShowcaseHeight) {
      showcaseHeight = maxShowcaseHeight;
    }
    var showcaseInnerHeight = showcaseHeight - scrollPadding;
    var titleWidth = Math.floor(titleSectionWidthPercent * 100) + 'vw';
    if (this.props.showcase) {
      return (
        <div>
          <ShowcaseBackground percentBlur={1 - this.state.titleSectionPercentVisible} height={this.props.height} showcase={this.props.showcase} />
          <ShowcaseTitleBar percentFade={this.state.titleSectionPercentVisible} height={showcaseTitleHeight} showcase={this.props.showcase} />
          <div id="showcase-outer" style={this.styleOuter(showcaseHeight)} onScroll={this.onScroll}>
            <div id="showcase-inner" style={this.styleInner(showcaseInnerHeight)}>
              <ShowcaseTitle width={titleWidth} height={showcaseInnerHeight} showcase={this.props.showcase} />
              <SectionsList height={showcaseInnerHeight} sections={this.props.showcase.sections} />
            </div>
          </div>
        </div>

      )
    } else {
      return (<Loading />)
    }
  }
});

// each file will export exactly one component
module.exports = ShowcaseShow;
