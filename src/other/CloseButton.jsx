"use strict"
var React = require("react");
var mui = require("material-ui");

const CurrentTheme = require('../modules/CurrentTheme.jsx')

var CloseButton = React.createClass({
  propTypes: {
    alternate: React.PropTypes.bool,
    clickEvent: React.PropTypes.func.isRequired,
    height: React.PropTypes.number
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      alternate: false,
      height: 35,
    }
  },

  color: function() {
    if (this.props.alternate) {
      return CurrentTheme.getCurrentPallette(this.context.muiTheme).alternateTextColor;
    } else {
      return CurrentTheme.getCurrentPallette(this.context.muiTheme).textColor;
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
        style={{ height: "100%", padding: 0 }}
      >
        <mui.FontIcon className="material-icons" color={this.color()} style={this.iconStyle()}>clear</mui.FontIcon>
      </mui.EnhancedButton>
    );
  },
});

module.exports = CloseButton;
