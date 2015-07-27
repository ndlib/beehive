var React = require("react");

var Scroller = React.createClass({
  propTypes: {
    target: React.PropTypes.string.isRequired,
  },

  onMouseDown: function(direction, event) {
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

  maxScroll: function() {
    return $(this.props.target).get(0).scrollWidth - $(this.props.target).get(0).clientWidth;
  },

  render: function() {
    var left = "";
    var right = "";

    if($(this.props.target).get(0)) {
      if($(this.props.target).get(0).scrollLeft > 0) {
        left = (
          <div className="scroll-left" onMouseDown={this.onMouseDown.bind(this, -1)} style={this.style()}>
            <i className="scroll-arrow mdi-navigation-chevron-left" style={this.iconStyle()}/>
          </div>
        );
      }

      if($(this.props.target).get(0).scrollLeft < this.maxScroll()) {
        right = (
        <div className="scroll-right" onMouseDown={this.onMouseDown.bind(this, 1)} style={this.style()}>
            <i className="scroll-arrow mdi-navigation-chevron-right" style={this.iconStyle()}/>
          </div>
        );
      }
    }
    return(
      <div>
        {left}
        {right}
      </div>
    );
  }
});

module.exports = Scroller;
