'use strict'
var React = require('react');
import { Link } from 'react-router'
var mui = require('material-ui');
var ItemImage = require('./ItemImage.jsx');

const CollectionUrl = require('../../modules/CollectionUrl.jsx')

var GridItem = React.createClass({
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

  manifestIcon: function(item) {
    if(item.metadata && item.metadata.manuscript_url) {
      return (<img src="/images/pt.icon.drk.png" className="manuscript-icon" alt="Manifest Available" title="Manifest Available" style={{position: 'absolute', right: '0', top: '0', maxWidth: '15%'}}/>)
    }
    return null
  },

  render: function() {
    return (
      <Link to={CollectionUrl.itemObjectUrl(this.props.item)}>
        <mui.Card
          style={{cursor: 'pointer', position: 'relative'}}
        >

          { this.cardMedia() }
          {this.manifestIcon(this.props.item)}
        </mui.Card>
      </Link>
    );
  }
});

module.exports = GridItem;
