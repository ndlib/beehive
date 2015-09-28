var React = require("react");

var Scroller = React.createClass({
  propTypes: {
    target: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      element: null,
    };
  },

  onMouseDown: function(direction, event) {
    var scrollDelta = Math.ceil(this.state.element.clientWidth * (3/4));
    $(this.state.element).animate({scrollLeft: (this.state.element.scrollLeft + scrollDelta * direction)}, 500);
  },

  componentDidMount: function() {
    this.setState({
      element: $(this.props.target).get(0),
    });
  },

  style: function() {
    return {
      cursor: "pointer",
      fontSize: "3em",
      zIndex: 1,
    };
  },

  iconStyle: function() {
    return {
      fontSize: "1em",
    };
  },

  maxScroll: function() {
    return this.state.element.scrollWidth - this.state.element.clientWidth;
  },

  render: function() {
    var left;
    var right;

    if(this.state.element) {
      if(this.state.element.scrollLeft > 0) {
        left = (
          <div className="scroll-left" onMouseDown={this.onMouseDown.bind(this, -1)} style={this.style()}>
            <i className="scroll-arrow mdi-navigation-chevron-left" style={this.iconStyle()}/>
          </div>
        );
      }

      if(this.state.element.scrollLeft < this.maxScroll() - 10) {
        right = (
          <div className="scroll-right" onMouseDown={this.onMouseDown.bind(this, 1)} style={this.style()}>
            <i className="scroll-arrow mdi-navigation-chevron-right" style={this.iconStyle()}/>
          </div>
        );
      }
    }
    return (
      <div>
        {left}
        {right}
      </div>
    );
  }
});

module.exports = Scroller;
