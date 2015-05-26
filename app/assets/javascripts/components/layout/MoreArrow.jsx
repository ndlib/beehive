var React = require("react")

var MoreArrow = React.createClass({
  style: function() {
    return {
      position: "fixed",
      bottom: "80px",
      right: "20px",
    }
  },

  onClick: function() {
    console.log("clicked");
    window.scroll(0,document.body.offsetHeight);
  },

  render: function() {
    return (
      <div style={this.style()} onClick={this.onClick}>MORE CONTENT ↓</div>
    );
  }
});

module.exports = MoreArrow;
