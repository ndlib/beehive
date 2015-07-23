//app/assets/javascripts/components/ShowcaseShow.jsx
var React = require('react');

var maxShowcaseHeight = 840;
var showcaseTitleHeight = 40;
var scrollPadding = 80;
var titleSectionWidthPercent = 0.85;
var minBackgroundBlur = 0.3;
var maxBackgroundBlur = 0.8;

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
    if(this.ie()) {
      $(".ps-scrollbar-x-rail").hide();
    }
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
      paddingTop: '20px',
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
    };
  },

  componentWillMount: function(){
    document.body.className = document.body.className + " showcase-bg";
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

  ie: function() {
    // return true if Internet Exploder else false
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return true;
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        return true;
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       return true;
    }
    return false;
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
    if (this.props.showcase) {
      return (
        <div>
          <ShowcaseBackground percentBlur={backgroundBlur} height={this.props.height} showcase={this.props.showcase} />
          <ShowcaseTitleBar percentFade={this.state.titleSectionPercentVisible} height={showcaseTitleHeight} showcase={this.props.showcase} />
          <div id="showcase-outer" className="showcase-outer" style={this.styleOuter(showcaseHeight)} onScroll={this.onScroll}>
            <div id="showcase-inner" className="showcase-inner" style={this.styleInner(showcaseInnerHeight)}>
              <ShowcaseTitle height={showcaseInnerHeight} showcase={this.props.showcase} />
              <ShowcaseSections height={showcaseInnerHeight} showcase={this.props.showcase} />
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
