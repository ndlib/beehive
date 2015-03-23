//app/assets/javascripts/components/ShowcaseShow.jsx
var React = require('react');

var ShowcaseShow = React.createClass({
  displayName: 'Showcase Show',
  propTypes: {
    showcase: React.PropTypes.object,
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

  onWheel: function(event) {
    event.preventDefault();
    var newPosition = 0;
    var scrollSpeed = 30;
    var scrollTolerance = 2;
    var deltaScroll = 0;
    if(Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      deltaScroll = event.deltaX;
    }
    else {
      deltaScroll = event.deltaY;
    }
    console.log(deltaScroll);
    if (deltaScroll > scrollTolerance) {
      var maxLeft = $("#showcase-inner").prop("scrollWidth") - $("#showcase-outer").width();
      if($("#showcase-inner").position().left > -maxLeft) {
        newPosition = $("#showcase-inner").position().left - scrollSpeed;
        $("#showcase-inner").css({"left" : newPosition + "px"})
      }
      else {
        $("#showcase-inner").css({"left" : -maxLeft + "px"})
      }
    }
    else if (deltaScroll < -scrollTolerance) {
      if ($("#showcase-inner").position().left < 0) {
        newPosition = $("#showcase-inner").position().left + scrollSpeed;
        $("#showcase-inner").css({"left" : newPosition + "px"})
      }
      else {
        $("#showcase-inner").css({"left" : "0px"})
      }

    }
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
