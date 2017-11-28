import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper } from 'material-ui'

var MediaQuery = require('react-responsive')

var PagesShow = createReactClass({
  propTypes: {
    title: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  },
  headerStyle: function () {
    return {
      maxWidth: '80%',
      margin: '36px auto 36px',
      textAlign: 'center',
    }
  },

  contentStyle: function (media) {
    var style = {
      fontSize: '16px',
      maxWidth: '32.5em', // Should put it between 70-75 characters at 1em (16px)
      margin: '0 auto 60px',
    }
    if (media == 'narrow') {
      style.margin = '0 0'
    }
    return style
  },

  paperStyle: function (media) {
    switch (media) {
      case 'wide':
      case 'medium':
        return {
          width: '70%',
          margin: '0 auto',
          padding: '2rem',
        }
      case 'narrow':
        return {
          width: '100%',
          margin: '0 0',
          padding: '2rem',
        }
    }
  },

  depth: function (media) {
    if (media == 'wide') {
      return 1
    }
    return 0
  },

  getPaper: function (media) {
    var pageName
    if (this.props.title) {
      pageName = (<h2 style={this.headerStyle()} >{this.props.title}</h2>)
    }
    return (
      <Paper className='essay-content' style={this.paperStyle(media)}>
        {pageName}
        <div style={this.contentStyle(media)} dangerouslySetInnerHTML={{ __html:this.props.content }} />
        {this.props.children}
      </Paper>
    )
  },

  render: function () {
    return (
      <div id='page-show'>
        <MediaQuery minWidth={1400} key='1'>
          {this.getPaper('wide')}
        </MediaQuery>
        <MediaQuery minWidth={1000} maxWidth={1400} key='2'>
          {this.getPaper('medium')}
        </MediaQuery>
        <MediaQuery maxWidth={1000} key='3'>
          {this.getPaper('narrow')}
        </MediaQuery>
      </div>
    )
  },
})

module.exports = PagesShow
