var React = require("react");

var Scroller = React.createClass({
  propTypes: {
    target: React.PropTypes.string.isRequired,
  },

  onClick: function(direction, event) {
    $(this.props.target).get(0).scrollLeft += 50 * direction;
  },

  style: function() {
    return {
      cursor: "pointer",
      fontSize: "3em"
    };
  },

  iconStyle: function() {
    return {
      fontSize: "1em",
    };
  },

  render: function() {
    return(
      <div>
        <div id="scrollLeft" onClick={this.onClick.bind(this, -1)} style={this.style()}>
          <i className="scrollArrow mdi-navigation-chevron-left" style={this.iconStyle()}/>
        </div>
        <div id="scrollRight" onClick={this.onClick.bind(this, 1)} style={this.style()}>
          <i className="scrollArrow mdi-navigation-chevron-right" style={this.iconStyle()}/>
        </div>
      </div>
    );
  }
});

module.exports = Scroller;
