var React = require("react");
var Scroll = require('react-scroll');

var Link = Scroll.Link;
var Element = Scroll.Element;

var MoreArrow = React.createClass({
  style: function() {
    return {
      position: "fixed",
      bottom: "80px",
      right: "20px",
      cursor: "pointer",
      color: "#f5f5f5",
    }
  },


  render: function() {
    return (
      <Link to="startShowcases" spy={true} smooth={true} offset={50} duration={500} >
        <div style={this.style()}>MORE ↓</div>
      </Link>
    );
  }
});

module.exports = MoreArrow;
