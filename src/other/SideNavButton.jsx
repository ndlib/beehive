import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Link } from 'react-router-dom'
import { FlatButton, FontIcon } from 'material-ui'

const SideNavButton = createReactClass({
  propTypes: {
    href: PropTypes.string,
    onMouseDown: PropTypes.func,
    offsetTop: PropTypes.number,
    rightIcon: PropTypes.bool,
    onKeyboardFocus: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onTouchStart: PropTypes.func,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  getDefaultProps: function () {
    return {
      offsetTop: window.innerHeight / 2,
      rightIcon: false,
      href: '',
      onMouseDown: () => {},
      onKeyboardFocus: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onTouchStart: () => {},
      buttonOnOverlay: false,
    }
  },

  getInitialState () {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
    }
  },

  buttonStyles: function () {
    const hovered = (this.state.hovered || this.state.isKeyboardFocused)
    let styles = {
      top: (this.props.offsetTop - 30) + 'px',
      opacity: hovered ? '1' : '0.7',
      backgroundColor: '#E0E0E0',
      borderRadius: '50%',
      display: 'inline-block',
      margin: '0',
      marginTop: '29px',
      width: '60px',
      minWidth: '60px',
      height: '60px',
      textAlign: 'center',
      lineHeight: '60px',
      position: 'fixed',
      zIndex: '3',
    }

    if (this.props.rightIcon) {
      styles['right'] = '-29px'
    } else {
      styles['left'] = '-29px'
    }
    return styles
  },

  iconStyles: function () {
    const hovered = (this.state.hovered || this.state.isKeyboardFocused)

    let styles = {
      color: hovered ? '#212121' : '#ffffff',
      fontSize: '25px',
      position: 'absolute',
      top: '17.5px',
    }
    if (this.props.rightIcon) {
      styles['left'] = '5px'
    }
    return styles
  },

  chevron: function () {
    if (this.props.rightIcon) {
      return 'chevron_right'
    } else {
      return 'chevron_left'
    }
  },

  content: function () {
    return (
      <FlatButton
        onMouseDown={this.props.onMouseDown}
        style={this.buttonStyles()}
        onKeyboardFocus={this._handleKeyboardFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onTouchStart={this._handleTouchStart}
        disableTouchRipple
      >
        <FontIcon className='material-icons' style={this.iconStyles()} >{this.chevron()}</FontIcon>
      </FlatButton>
    )
  },

  render: function () {
    if (this.props.href) {
      return (<Link to={this.props.href}>{this.content()}</Link>)
    }
    return this.content()
  },

  _handleKeyboardFocus (e, isKeyboardFocused) {
    this.setState({ isKeyboardFocused: isKeyboardFocused })
    this.props.onKeyboardFocus(e, isKeyboardFocused)
  },

  _handleMouseEnter (e) {
    // Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({ hovered: true })
    this.props.onMouseEnter(e)
  },

  _handleMouseLeave (e) {
    this.setState({ hovered: false })
    this.props.onMouseLeave(e)
  },

  _handleTouchStart (e) {
    this.setState({ touch: true })
    this.props.onTouchStart(e)
  },
})

module.exports = SideNavButton
