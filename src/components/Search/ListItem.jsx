'use strict'
var React = require('react');
var mui = require('material-ui');
var ItemImage = require('./ItemImage.jsx');

var ListItem = React.createClass({
  mixins: [
    require('../../mixins/LoadRemoteMixin.jsx')
  ],

  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  leftIcon: function() {
    var item = this.props.item;
    if(item.image || item.multimedia) {
      // has an image somewhere
    } else {
      // doesn't have an image so give it default
      item.image = { "thumbnail/medium": { contentUrl: "/images/meta-only-item.jpg" }};
    }

    return (
      <div style={{top: '4px', left: '16px', padding: "2px", width: '77px', height: '75px', margin: "0 12px" }}>
        <ItemImage item={ item } />
      </div>
    );
  },

  primaryText: function() {
    return (
      <span style={{marginLeft: '30px', display: 'inline-block'}}>
        {this.props.item.name}
      </span>
    );
  },

  secondaryText: function() {
    return (
      <span style={{ maxWidth: '50em', marginLeft: '30px'}}>
        { this.props.item.description }
      </span>
    );
  },

  render: function() {
    return (
      <div>
        <mui.ListItem
          leftIcon={this.leftIcon()}
          primaryText={this.primaryText()}
          secondaryText={this.secondaryText()}
          secondaryTextLines={2}
          onClick={this.itemOnClick}
          innerDivStyle={{paddingLeft:'80px', height:'85px'}}
        />
        <mui.Divider  style={{marginLeft: "110px" }} />
      </div>
    );
  }
});

module.exports = ListItem;
