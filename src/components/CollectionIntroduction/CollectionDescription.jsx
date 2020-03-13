import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import SitePathCard from '../Collection/SitePathCard.jsx'
import PagesShow from '../Pages/PagesShow.jsx'
import PreviewLink from '../../layout/PreviewLink.jsx'

const CollectionDescription = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
  },

  style: function () {
    return {}
  },

  showNext: function () {
    if (this.props.collection &&
      this.props.collection.site_path &&
      this.props.collection.site_path.length > 0) {
      return (
        <React.Fragment>
          <div style={{ margin: '0 auto', maxWidth: '500px' }}>
            <SitePathCard
              headerTitle='Continue to'
              siteObject={this.props.collection.site_path[0]}
              addNextButton
              fixedSize={false}
            />
          </div>
          <PreviewLink siteObject={this.props.collection.site_path[0]} />
        </React.Fragment>
      )
    } else {
      return null
    }
  },

  render: function () {
    return (
      <PagesShow
        content={this.props.collection.description}
        collection={this.props.collection}
      >
        {this.showNext()}
      </PagesShow>
    )
  },
})

export default CollectionDescription
