import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Link } from 'react-router'
const PrevNext = require('../modules/PrevNextUtils.jsx')

const NextModal = createReactClass({
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
    return (
      <Link
        to={this.props.url}
        className='next-button half-circle-button'
        style={PrevNext.buttonStyles(this.props.offsetTop, '#E0E0E0')}
      >
        <i className='material-icons'>chevron_right</i>
      </Link>
    )
  },
})

module.exports = NextModal
