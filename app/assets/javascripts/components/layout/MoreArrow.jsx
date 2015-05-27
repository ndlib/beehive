var React = require("react")

var MoreArrow = React.createClass({
  style: function() {
    return {
      position: "fixed",
      bottom: "80px",
      right: "20px",
      cursor: "pointer",
    }
  },

  onClick: function() {
    window.scroll(0,document.body.offsetHeight);
  },

  render: function() {
    return (
      <div style={this.style()} onClick={this.onClick}>MORE ↓</div>
    );
  }
});

module.exports = MoreArrow;
