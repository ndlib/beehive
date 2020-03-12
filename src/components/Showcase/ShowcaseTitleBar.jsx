import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui'
const CloseButton = require('../../other/CloseButton.jsx')

const ShowcaseTitleBar = createReactClass({

  propTypes: {
    showcase: PropTypes.object.isRequired,
    percentFade: PropTypes.number,
    height: PropTypes.number,
  },

  getDefaultProps: function () {
    return {
      percentFade: 0,
      height: 35,
    }
  },

  style: function () {
    return {
      opacity: 1 - this.props.percentFade,
      backgroundColor: 'rgba(0, 0, 0, 0.541176)',
      height: this.props.height + 'px',
      zIndex: '200',
    }
  },

  titleBarStyle: function () {
    return {
      color: '#fff',
      lineHeight: this.props.height + 'px',
    }
  },

  name: function () {
    return this.props.showcase.name_line_1
  },

  closeButtonStyle: function () {
    return {
      marginLeft: 'auto',
      float: 'right',
    }
  },

  render: function () {
    if (this.props.showcase) {
      return (
        <Toolbar className='title-bar' style={this.style()}>
          <ToolbarGroup key={0} style={{ maxWidth: this.mobile ? '80%' : '90%', float: 'left' }}>
            <h2><ToolbarTitle text={this.name()} style={this.titleBarStyle()} /></h2>
          </ToolbarGroup>
          <ToolbarGroup key={1} style={this.closeButtonStyle()}>
            <CloseButton alternate height={this.props.height} />
          </ToolbarGroup>
        </Toolbar>
      )
    } else {
      return (<div />)
    }
  },
})

export default ShowcaseTitleBar
