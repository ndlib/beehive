
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var CollectionIntroCard = require('./CollectionIntroCard.jsx')
var SitePathCardList = require('./SitePathCardList.jsx')
var CollectionShowSitePath = createReactClass({

  propTypes: {
    collection: PropTypes.object.isRequired,
  },

  intro: function () {
    if (this.props.collection.description) {
      return (
        <CollectionIntroCard collection={this.props.collection} />
      )
    }
  },

  render: function () {
    if (this.props.collection.site_path) {
      return (
        <SitePathCardList sitePath={this.props.collection.site_path} intro={this.intro()} />
      )
    } else {
      return (
        <div />
      )
    }
  },
})

module.exports = CollectionShowSitePath
