'use strict'
var React = require('react');
var mui = require('material-ui');

var ListItem = React.createClass({
  mixins: [LoadRemoteMixin],
  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  render: function() {
    var item = this.props.item;
    var avatar;
    if(item.image) {
      avatar = (
        <div style={{top: '4px', left: '16px', width: '80px', height: '80px'}}>
          <ItemImage image={item.image} />
        </div>
      );
    }
    else {
      avatar = (<mui.Avatar>{item.name.charAt(0).toUpperCase()}</mui.Avatar>);
    }

    var name = (
      <span style={{marginLeft: '48px'}}>
        {item.name}
      </span>
    );

    var description = (
      <span style={{
          maxWidth: '40em',
          marginLeft: '48px'}}
      >
        {item.description}
      </span>
    );

    return (
      <div>
        <mui.ListItem
          leftAvatar={avatar}
          primaryText={name}
          secondaryText={description}
          secondaryTextLines={2}
          onClick={this.itemOnClick}
        />
        <mui.ListDivider />
      </div>
    );
  }
});

module.exports = ListItem;
