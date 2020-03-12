// app/assets/javascripts/components/PreviousSection.jsx
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Link } from 'react-router'
const PrevNext = require('../modules/PrevNextUtils.jsx')

const PreviousModal = createReactClass({
  displayName: 'Previous Modal Link',

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
        className='prev-button half-circle-button'
        style={PrevNext.buttonStyles(this.props.offsetTop, '#E0E0E0')}
      >
        <i className='material-icons'>chevron_left</i>
      </Link>
    )
  },
})

// each file will export exactly one component
export default PreviousModal
