// app/assets/javascripts/components/layout/PageContent.jsx
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper } from '@material-ui/core'

const PageContent = createReactClass({
  propTypes: {
    fluidLayout: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    children: PropTypes.node,
  },

  getDefaultProps: function () {
    return ({ fluidLayout: false })
  },

  classes: function () {
    if (this.props.fluidLayout) {
      return 'container-fluid'
    } else {
      return 'container'
    }
  },

  style: function () {
    if (this.props.fluidLayout) {
      return ({})
    } else {
      return ({
        padding: '0 8%',
        background: 'none',
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0)',
      })
    }
  },

  render: function () {
    return (
      <Paper
        id='page-content'
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        transitionEnabled={false}
        circle={false}
        rounded={false}
        zDepth={0}
        style={this.style()}
      >
        {this.props.children}
      </Paper>
    )
  },
})

// each file will export exactly one component
export default PageContent
