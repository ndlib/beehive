import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var SitePathCard = require('../Collection/SitePathCard.jsx');
var PagesShow = require('../Pages/PagesShow.jsx');
var PreviewLink = require('../../layout/PreviewLink.jsx')

var CollectionDescription = createReactClass({
  propTypes: {
    collection: PropTypes.object.isRequired,
    height: PropTypes.string,
    id: PropTypes.string,
  },

  style: function() {
    return {};
  },

  showNext: function() {
    if(this.props.collection &&
      this.props.collection.site_path &&
      this.props.collection.site_path.length > 0){
      return [
        <div style={{margin: '0 auto', maxWidth: '500px'}}>
          <SitePathCard
            headerTitle="Continue to"
            siteObject={this.props.collection.site_path[0]}
            addNextButton={true}
            fixedSize={false}
          />
        </div>,
        <PreviewLink siteObject={this.props.collection.site_path[0]}/>
      ];
    }
    else {
      return null;
    }
  },

  render: function() {
    return (
        <PagesShow content={this.props.collection.description}>
          {this.showNext()}
        </PagesShow>
    );
  }
});

module.exports = CollectionDescription;
