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
    var image = this.props.item.image;
    if(!image) {
      image = { "thumbnail/medium": { contentUrl: "/images/meta-only-item.jpg" }};
    }

    return (
      <mui.CardMedia overlay={ this.mediaOverlay() }>
        <ItemImage image={ image } />
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
