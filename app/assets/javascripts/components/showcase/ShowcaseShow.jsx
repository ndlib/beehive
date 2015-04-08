//app/assets/javascripts/components/ShowcaseShow.jsx
var React = require('react');

var ShowcaseShow = React.createClass({
  displayName: 'Showcase Show',
  propTypes: {
    showcase: React.PropTypes.object,
  },
  componentDidUpdate: function() {
    $('#showcase-outer').perfectScrollbar({useBothWheelAxes: false, suppressScrollY: true });
    this.checkHash();
  },

  componentDidMount: function() {
    window.addEventListener("hashchange", this.checkHash, false);
    this.checkHash();
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
      height: '500px',
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
      height: '500px',
      top: 0,
      left: 0,

      padding: '10px',
      marginBottom: '2em',

      //backgroundImage: 'url(' + this.props.showcase.image.contentUrl + ')',
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
    };
  },


componentWillMount: function(){
  document.body.className = "showcase-bg";

},
componentWillUnmount: function(){
    document.body.style.backgroundImage = null;
},

  render: function() {
    if (this.props.showcase) {
      document.body.style.backgroundImage = "url(" + this.props.showcase.image.contentUrl + ")";
      return (
        <div id="showcase-outer" style={this.styleOuter()} onWheel={this.onWheel}>
          <div id="showcase-inner" style={this.styleInner()}>
            <ShowcaseEditorTitle showcase={this.props.showcase} />
            <SectionsList sections={this.props.showcase.sections} />
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
