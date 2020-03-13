import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Button } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import { Link } from 'react-router-dom'
const SearchStore = require('../store/SearchStore.js')

const CloseButton = createReactClass({
  propTypes: {
    href: PropTypes.string,
    alternate: PropTypes.bool,
  },

  getDefaultProps: function () {
    return {
      alternate: false,
    }
  },

  color: function () {
    if (this.props.alternate) {
      return '#ffffff'
    } else {
      return '#000000'
    }
  },

  iconStyle: function () {
    return { border:'solid 1px', verticalAlign: 'middle', width: 'initial', height: 'initial', color: this.color() }
  },

  // generate what the back location url is
  href: function () {
    if (this.props.href) {
      return this.props.href
    }

    // go back to the search page if we have search information in the store

    const current = window.location.pathname
    let stopword

    // this should bring us up 1 level. eg section=>showcase showcase=>collection
    if (current.includes('/items/')) {
      if (SearchStore.collection) {
        const searchQuery = SearchStore.searchQuery()
        let queryString = '?'
        for (const key in searchQuery) {
          queryString += `${key}=${searchQuery[key]}&`
        }
        return `${SearchStore.searchPath()}${queryString}`
      }
      stopword = 'items'
    } else if (current.includes('/pages/')) {
      stopword = 'pages'
    } else if (current.includes('/sections/')) {
      stopword = 'sections'
    } else if (current.includes('/showcases/')) {
      stopword = 'showcases'
    } else {
      return '/'
    }

    const re = RegExp(`((?:\/[^\/]+)+)\/${stopword}`) // eslint-disable-line no-useless-escape
    return re.exec(current)[1]
  },

  render: function () {
    return (
      <Link to={this.href()}>
        <Button
          disableRipple
          style={{ height: '100%', padding: 0 }}
        >
          <ClearIcon className='material-icons' style={this.iconStyle()} />
        </Button>
      </Link>
    )
  },
})

export default CloseButton
