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
      overflowX: 'hidden',
      overflowY: 'hidden',
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
      border: '1px solid #bed5cd',
      padding: '10px',
      marginBottom: '2em',
    };
  },

  onWheel: function(event) {
    event.preventDefault();
    var newPosition = 0;
    var scrollSpeed = 100;
    if (event.deltaY > 0) {
      var maxLeft = $("#showcase-inner").prop("scrollWidth") - $("#showcase-outer").width();
      if($("#showcase-inner").position().left > -maxLeft) {
        newPosition = $("#showcase-inner").position().left - scrollSpeed;
        $("#showcase-inner").css({"left" : newPosition + "px"})
      }
      else {
        $("#showcase-inner").css({"left" : -maxLeft + "px"})
      }
    }
    else if (event.deltaY < 0) {
      if ($("#showcase-inner").position().left < 0) {
        newPosition = $("#showcase-inner").position().left + scrollSpeed;
        $("#showcase-inner").css({"left" : newPosition + "px"})
      }
      else {
        $("#showcase-inner").css({"left" : "0px"})
      }

    }
  },
  render: function() {
    if (this.props.showcase) {
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
