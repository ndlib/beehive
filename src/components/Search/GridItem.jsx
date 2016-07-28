'use strict'
var React = require('react');
var mui = require('material-ui');
var ItemImage = require('./ItemImage.jsx');

var GridItem = React.createClass({
  mixins: [
    require('../../mixins/LoadRemoteMixin.jsx')
  ],
  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  mediaOverlay: function() {
    var name = (
      <span style={{fontFamily: 'GPCMed'}}>
        { this.props.item.name }
      </span>
    );
    return (<mui.CardTitle title={ name }/>);
  },

  cardMedia: function() {
    return (
      <mui.CardMedia overlay={ this.mediaOverlay() }>
        <ItemImage item={ this.props.item } />
      </mui.CardMedia>
    );
  },

  render: function() {
    return (
      <mui.Card
        onClick={this.itemOnClick}
        style={{cursor: 'pointer'}}
      >
        { this.cardMedia() }
      </mui.Card>
    );
  }
});

module.exports = GridItem;
