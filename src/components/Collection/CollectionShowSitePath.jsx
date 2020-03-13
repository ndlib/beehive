import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import CollectionIntroCard from './CollectionIntroCard.jsx'
import SitePathCardList from './SitePathCardList.jsx'

const CollectionShowSitePath = createReactClass({

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

export default CollectionShowSitePath
