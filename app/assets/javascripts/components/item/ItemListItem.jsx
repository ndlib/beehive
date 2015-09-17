'use strict'
var React = require('react');
var ItemActions = require('../../actions/ItemActions');
var ItemActionTypes = require('../../constants/ItemActionTypes');

var ItemListItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired,
    view: React.PropTypes.string,
  },

  render: function() {
    if(this.props.view === 'list'){
      return (
        <ListItem item={this.props.item} />
      );
    }
    else {
      return (
        <GridItem item={this.props.item} />
      );
    }
  }
});

// each file will export exactly one component
module.exports = ItemListItem;
