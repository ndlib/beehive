'use stirct'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var TitleBar = require('../layout/TitleBar.jsx')
var PageHeader = createReactClass({
  displayName: 'Page Header',

  propTypes: {
    branding: PropTypes.bool,
  },

  style: function() {
    return {
      width: "100%",
    }
  },

  render: function() {
    var titleBar = this.props.children
    if (!titleBar) {
      titleBar = (
        <TitleBar />
      )
    }
    return (
      <div id="banner-wrapper">
        <header id="banner" role="banner" className="home" style={this.style()} >
          <nav className="" role="navigation" >
            {titleBar}
          </nav>
        </header>
      </div>
    )
  }
})

module.exports = PageHeader
