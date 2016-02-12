"use strict"
var React = require("react");
var mui = require("material-ui");

var CloseButton = React.createClass({
  mixins: [
    require("../mixins/CurrentThemeMixin.jsx")
  ],

  propTypes: {
    alternate: React.PropTypes.bool,
    clickEvent: React.PropTypes.func.isRequired,
    height: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      alternate: false,
      height: 35,
    }
  },

  color: function() {
    if (this.props.alternate) {
      return this.getCurrentPallette().alternateTextColor;
    } else {
      return this.getCurrentPallette().textColor;
    }
  },

  iconStyle: function() {
    return { border:'solid 1px', verticalAlign: "middle", width: "initial", height: "initial" };
  },

  render: function() {
    return (
      <mui.EnhancedButton
        onClick={this.props.clickEvent}
        disableTouchRipple={true}
        style={{ height: this.props.height, padding: 0 }}
      >
        <mui.FontIcon className="material-icons" color={this.color()} style={this.iconStyle()}>clear</mui.FontIcon>
      </mui.EnhancedButton>
    );
  },
});

module.exports = CloseButton;
