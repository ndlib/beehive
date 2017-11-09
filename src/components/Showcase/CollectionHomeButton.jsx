'use strict'
var React = require("react");
var mui = require("material-ui");

const CollectionUrl = require('../../modules/CollectionUrl.jsx')

var CollectionHomeButton = React.createClass({
  propTypes: {
    collection: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  onClick: function() {
    window.location = CollectionUrl.collectionUrl(this.props.collection);
  },

  render: function() {
    return (
      <mui.FloatingActionButton
        onClick={this.onClick}
        disableTouchRipple={true}
        style={{position: 'absolute', bottom: '10px', right: '10px', zIndex: '1000'}}
        zDepth={3}
      >
        <mui.FontIcon
          className="material-icons"
          color={this.context.muiTheme.alternateTextColor}
        >home</mui.FontIcon>
      </mui.FloatingActionButton>
    )
  }
});

module.exports = CollectionHomeButton;
