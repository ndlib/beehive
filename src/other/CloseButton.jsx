import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { FlatButton, FontIcon } from 'material-ui'
import { Link } from 'react-router-dom'
var SearchStore = require('../store/SearchStore.js')

var CloseButton = createReactClass({
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
      return '#000000'
    } else {
      return '#ffffff'
    }
  },

  iconStyle: function () {
    return { border:'solid 1px', verticalAlign: 'middle', width: 'initial', height: 'initial' }
  },

  // generate what the back location url is
  href: function () {
    if (this.props.href) {
      return this.props.href
    }

    // go back to the search page if we have search information in the store
    if (SearchStore.collection) {
      return {
        pathname: SearchStore.searchPath(),
        query: SearchStore.searchQuery(),
      }
    }

    let current = window.location.pathname
    let stopword

    // this should bring us up 1 level. eg section=>showcase showcase=>collection
    if (current.includes('/items/')) {
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

    let re = RegExp(`((?:\/[^\/]+)+)\/${stopword}`)
    return re.exec(current)[1]
  },

  render: function () {
    return (<div />)
    return (
      <Link to={this.href()}>
        <FlatButton
          disableTouchRipple
          style={{ height: '100%', padding: 0 }}
        >
          <FontIcon className='material-icons' color={this.color()} style={this.iconStyle()}>clear</FontIcon>
        </FlatButton>
      </Link>
    )
  },
})

module.exports = CloseButton
