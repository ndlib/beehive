import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Link } from 'react-router'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PrevNext from '../modules/PrevNextUtils.jsx'

const NextModal = createReactClass({
  displayName: 'Next Modal Link',

  propTypes: {
    url: PropTypes.string.isRequired,
    offsetTop: PropTypes.number,
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
        <ChevronRightIcon className='material-icons' />
      </Link>
    )
  },
})

export default NextModal
