import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Toolbar, Typography } from '@material-ui/core'
import CloseButton from '../../other/CloseButton.jsx'

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
          <div style={{ maxWidth: this.mobile ? '80%' : '90%', float: 'left' }}>
            <Typography variant='h2' style={this.titleBarStyle()}>{this.name()}</Typography>
          </div>
          <div style={this.closeButtonStyle()}>
            <CloseButton alternate height={this.props.height} />
          </div>
        </Toolbar>
      )
    } else {
      return (<div />)
    }
  },
})

export default ShowcaseTitleBar
