
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
var mui = require("material-ui");

const CollectionUrl = require('../../modules/CollectionUrl.jsx')

var CollectionHomeButton = createReactClass({
  propTypes: {
    collection: PropTypes.object,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  onClick: function() {
    window.location = CollectionUrl.collectionUrl(this.props.collection);
  },

  render: function() {
    return (
      <FloatingActionButton
        onClick={this.onClick}
        disableTouchRipple={true}
        style={{position: 'absolute', bottom: '10px', right: '10px', zIndex: '1000'}}
      >
        <FontIcon
          className="material-icons"
          color={this.context.muiTheme.alternateTextColor}
        >home</FontIcon>
      </FloatingActionButton>
    )
  }
});

module.exports = CollectionHomeButton;
