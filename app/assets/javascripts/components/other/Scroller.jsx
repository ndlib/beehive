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

  top: function () {
    return (this.props.height / 2);
  },

  style: function() {
    return {
      top:  this.top() + "px",
      cursor: "pointer",
      fontSize: "3em",
      zIndex: 10,
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
            <i className="material-icons" style={this.iconStyle()}>chevron_left</i>
          </div>
        );
      }

      if(this.state.element.scrollLeft < this.maxScroll() - 10) {
        right = (
          <div className="scroll-right" onMouseDown={this.onMouseDown.bind(this, 1)} style={this.style()}>
            <i className="material-icons" style={this.iconStyle()}>chevron_right</i>
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
