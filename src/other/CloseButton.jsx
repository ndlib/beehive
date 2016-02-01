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
  },

  getDefaultProps: function() {
    return {
      alternate: false,
    }
  },

  color: function() {
    if (this.props.alternate) {
      return this.getCurrentPallette().alternateTextColor;
    } else {
      return this.getCurrentPallette().textColor;
    }
  },

  render: function() {
    return (
      <mui.EnhancedButton
        onClick={this.props.clickEvent}
        disableTouchRipple={true}
      >
        <mui.FontIcon className="material-icons" color={this.color()} style={{border:'solid 1px', marginTop:'16px'}}>close</mui.FontIcon>
      </mui.EnhancedButton>
    );
  },
});

module.exports = CloseButton;
