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

  manifestIcon: function(item) {
    if(item.metadata && item.metadata.manuscript_url) {
      return (<img src="/images/pt.icon.drk.png" className="manuscript-icon" alt="Manifest Available" title="Manifest Available" style={{position: 'absolute', right: '0', top: '0', maxWidth: '15%'}}/>)
    }
    return null
  },

  render: function() {
    return (
      <mui.Card
        onClick={this.itemOnClick}
        style={{cursor: 'pointer', position: 'relative'}}
      >

        { this.cardMedia() }
        {this.manifestIcon(this.props.item)}
      </mui.Card>
    );
  }
});

module.exports = GridItem;
