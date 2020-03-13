import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Toolbar, Typography } from '@material-ui/core'
const CloseButton = require('../../other/CloseButton.jsx')

const PageTitleBar = createReactClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    height: PropTypes.number,
  },

  getDefaultProps: function () {
    return {
      height: 35,
    }
  },

  getInitialState: function () {
    return {
      opacity: 1,
    }
  },

  style: function () {
    return {
      height: this.props.height + 'px',
      opacity: this.state.opacity,
      backgroundColor: 'rgba(51,51,51,1)',
      zIndex: '1',
    }
  },

  onScroll: function (event) {
    const element = event.target.scrollingElement
    const a = element.scrollTop / element.scrollHeight
    const percentVisible = Math.log2(1 + a * 10.0)
    this.setState({
      opacity: percentVisible,
    })
  },

  titleBarStyle: function () {
    return {
      lineHeight: this.props.height + 'px',
      color: 'white',
    }
  },

  closeButtonStyle: function () {
    return {
      marginLeft: 'auto',
      height: '100%',
      float: 'right',
    }
  },

  render: function () {
    return (
      <Toolbar id='PageTitleBar' className='title-bar' style={this.style()}>
        <div style={{ float:'left' }}>
          <Typography variant='h2' style={this.titleBarStyle()}>{this.props.title}</Typography>
        </div>
        <div style={this.closeButtonStyle()}>
          <CloseButton alternate height={this.props.height} />
        </div>
      </Toolbar>
    )
  },
})

export default PageTitleBar
