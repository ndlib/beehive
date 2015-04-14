//app/assets/javascripts/components/ShowcaseShow.jsx
var React = require('react');

var scrollPadding = 40;

var ShowcaseShow = React.createClass({
  displayName: 'Showcase Show',
  propTypes: {
    showcase: React.PropTypes.object,
    height: React.PropTypes.number.isRequired,
  },

  componentDidUpdate: function() {
    if (this.props.showcase && !this.scrollbarInitialized) {
      setTimeout(this.initializeScrollbar, 1000);
    }
    this.checkHash();
    this.updateScrollbar();
  },

  initializeScrollbar: function() {
    this.scrollbarInitialized = true;
    $('#showcase-outer').perfectScrollbar({useBothWheelAxes: false, suppressScrollY: true });
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

  styleInner: function() {
    return {
      position: 'absolute',
      height: (this.props.height - scrollPadding) + 'px',
      top: 0,
      left: 0,
      overflowX: 'visible',
      overflowY: 'visible',
    };
  },

  styleOuter: function() {
    return {
      position: 'relative',
      overflowY: 'hidden',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      height: this.props.height + 'px',
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
    var x = $("#sections-content-inner").offset().left;
    var dx = $( window ).width() * .75;
    var opacity = 1 - x/dx;
    $("#showcases-title-bar").css("opacity", opacity);
  },

  render: function() {
    if (this.props.showcase) {
      document.body.style.backgroundImage = "url(" + this.props.showcase.image.contentUrl + ")";
      return (
        <div id="showcase-outer" style={this.styleOuter()} onScroll={this.onScroll}>
          <div id="showcase-inner" style={this.styleInner()}>
            <ShowcaseEditorTitle height={this.props.height - scrollPadding} showcase={this.props.showcase} />
            <SectionsList height={this.props.height - scrollPadding} sections={this.props.showcase.sections} />
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
