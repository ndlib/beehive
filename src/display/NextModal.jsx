// app/assets/javascripts/components/NextSection.jsx
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Link } from 'react-router'
const PrevNext = require('../modules/PrevNextUtils.jsx')
const CurrentTheme = require('../../modules/CurrentTheme.jsx')

var NextModal = createReactClass({
  displayName: 'Next Modal Link',

  propTypes: {
    url: PropTypes.string.isRequired,
    offsetTop: PropTypes.number,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  getDefaultProps: function () {
    return {
      offsetTop: window.innerHeight / 2,
    }
  },

  render: function () {
    var id = this.props.id
    return (
      <Link
        to={this.props.url}
        className='next-button half-circle-button'
        style={PrevNext.buttonStyles(this.props.offsetTop, CurrentTheme.getCurrentPallette(this.context.muiTheme).accent3Color)}
      >
        <i className='material-icons'>chevron_right</i>
      </Link>
    )
  },
})

// each file will export exactly one component
module.exports = NextModal
