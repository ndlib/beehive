
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import {Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui'
var CloseButton = require('../../other/CloseButton.jsx');
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var ShowcaseTitleBar = createReactClass({

  propTypes: {
    showcase: PropTypes.object.isRequired,
    percentFade: PropTypes.number,
    height: PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      percentFade: 0,
      height: 35,
    }
  },

  style: function() {
    return {
      opacity: 1 - this.props.percentFade,
      backgroundColor: 'rgba(0, 0, 0, 0.541176)',
      height: this.props.height + 'px',
      zIndex: '200',
    };
  },

  titleBarStyle: function () {
    return {
      color: '#000000',
      lineHeight: this.props.height + "px",
    }
  },

  name: function () {
    return this.props.showcase.name_line_1;
  },

  closeButtonStyle: function() {
    return {
      marginLeft: 'auto',
      float: 'right',
    };
  },

  render: function() {
    if (this.props.showcase) {
      return (
        <Toolbar style={this.style()}>
          <ToolbarGroup key={0}>
            <ToolbarTitle text={this.name()} style={this.titleBarStyle()} />
          </ToolbarGroup>
          <ToolbarGroup key={1} style={this.closeButtonStyle()}>
            <CloseButton alternate={true} height={this.props.height}/>
          </ToolbarGroup>
        </Toolbar>
      );
    } else {
      return (<div />)
    }
  }
});

// each file will export exactly one component
module.exports = ShowcaseTitleBar;
