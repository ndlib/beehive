var React = require('react');
var mui = require("material-ui");
var ColorManipulator = mui.Utils.ColorManipulator;

var SideNavButton = React.createClass({
  mixins: [
    require("../mixins/CurrentThemeMixin.jsx")
  ],

  propTypes: {
    onClick: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    offsetTop: React.PropTypes.number,
    rightIcon: React.PropTypes.bool,
    onKeyboardFocus: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    buttonOnOverlay: React.PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      offsetTop: window.innerHeight/2,
      rightIcon: false,
      onClick: () => {},
      onMouseDown: () => {},
      onKeyboardFocus: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onTouchStart: () => {},
      buttonOnOverlay: false,
    };
  },

  getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
    };
  },

  buttonStyles: function() {
    var hovered = (this.state.hovered || this.state.isKeyboardFocused);
    var styles = {
      top: (this.props.offsetTop - 30) + 'px',
      opacity: hovered ? "1" : "0.7",
      backgroundColor: hovered ? ColorManipulator.darken(this.getCurrentPallette().accent3Color, .2) : this.getCurrentPallette().accent3Color,
      borderRadius: "50%",
      display: "inline-block",
      margin: "0",
      marginTop: "29px",
      width: "60px",
      height: "60px",
      textAlign: "center",
      lineHeight: "60px",
      position: "fixed",
      zIndex: "3",
    };

    if (this.props.rightIcon) {
      styles["right"] = "-29px";
    } else {
      styles["left"] = "-29px";
    }
    return styles;
  },

  iconStyles: function() {
    var hovered = (this.state.hovered || this.state.isKeyboardFocused);

    var styles = {
      color: hovered ? this.getCurrentPallette().textColor : this.getCurrentPallette().alternateTextColor,
      fontSize: "25px",
      position: "absolute",
      top: "17.5px",
    }
    if (this.props.rightIcon) {
      styles["left"] = "5px";
    }
    return styles;
  },

  chevron: function() {
    if (this.props.rightIcon) {
      return "chevron_right";
    } else {
      return "chevron_left";
    }
  },

  render: function() {
    return (
      <mui.EnhancedButton
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        style={this.buttonStyles()}
        onKeyboardFocus={this._handleKeyboardFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onTouchStart={this._handleTouchStart}
        disableTouchRipple={true}
        >
        <mui.FontIcon className="material-icons" style={this.iconStyles()} >{this.chevron()}</mui.FontIcon>
      </mui.EnhancedButton>
    );
  },

  _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseEnter(e) {
    //Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(e);
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    this.props.onMouseLeave(e);
  },

  _handleTouchStart(e) {
    this.setState({touch: true});
    this.props.onTouchStart(e);
  },
});

module.exports = SideNavButton;
