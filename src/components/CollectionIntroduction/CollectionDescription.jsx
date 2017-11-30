import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const SitePathCard = require('../Collection/SitePathCard.jsx')
const PagesShow = require('../Pages/PagesShow.jsx')
const PreviewLink = require('../../layout/PreviewLink.jsx')

const CollectionDescription = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
    height: PropTypes.string,
    id: PropTypes.string,
  },

  style: function () {
    return {}
  },

  showNext: function () {
    if (this.props.collection &&
      this.props.collection.site_path &&
      this.props.collection.site_path.length > 0) {
      return [
        <div style={{ margin: '0 auto', maxWidth: '500px' }}>
          <SitePathCard
            headerTitle='Continue to'
            siteObject={this.props.collection.site_path[0]}
            addNextButton
            fixedSize={false}
          />
        </div>,
        <PreviewLink siteObject={this.props.collection.site_path[0]} />,
      ]
    } else {
      return null
    }
  },

  render: function () {
    return (
      <PagesShow content={this.props.collection.description}>
        {this.showNext()}
      </PagesShow>
    )
  },
})

module.exports = CollectionDescription
