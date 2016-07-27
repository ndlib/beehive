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
    var item = this.props.item;
    if(item.image || item.multimedia) {
      // has an image somewhere
    } else {
      // doesn't have an image so give it default
      item.image = { "thumbnail/medium": { contentUrl: "/images/meta-only-item.jpg" }};
    }

    return (
      <mui.CardMedia overlay={ this.mediaOverlay() }>
        <ItemImage item={ item } />
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
