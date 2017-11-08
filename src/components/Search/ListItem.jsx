'use strict'
var React = require('react');
var mui = require('material-ui');
var ItemImage = require('./ItemImage.jsx');

const LoadRemote = require('../../modules/LoadRemote.jsx')

var ListItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  leftIcon: function() {
    return (
      <div style={{top: '4px', left: '16px', padding: "2px", width: '77px', height: '75px', margin: "0 12px" }}>
        <ItemImage item={ this.props.item } />
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

  manifestIcon: function(item) {
    if(item.metadata && item.metadata.manuscript_url) {
      return (<img src="/images/pt.icon.drk.png" className="manuscript-icon" alt="Manifest Available" title="Manifest Available" />)
    }
    return null
  },

  render: function() {
    return (
      <div>
        <mui.ListItem
          leftIcon={this.leftIcon()}
          primaryText={this.primaryText()}
          secondaryText={this.secondaryText()}
          secondaryTextLines={2}
          onClick={LoadRemote.itemOnClick(this.props.item)}
          innerDivStyle={{paddingLeft:'80px', height:'85px'}}
          rightIcon={this.manifestIcon(this.props.item)}
        />
        <mui.Divider  style={{marginLeft: "110px" }} />
      </div>
    );
  }
});

module.exports = ListItem;
