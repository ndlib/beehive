'use strict'
var React = require('react');
var mui = require('material-ui');

var ListItem = React.createClass({
  mixins: [MuiThemeMixin, LoadRemoteMixin],
  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  render: function() {
    var item = this.props.item;
    var avatar;
    if(item.image) {
      avatar = (<mui.Avatar src={item.image['thumbnail/small'].contentUrl} />);
    }
    else {
      avatar = (<mui.Avatar>{item.name.charAt(0).toUpperCase()}</mui.Avatar>);
    }
    return (
      <div>
        <mui.ListItem
          leftAvatar={avatar}
          primaryText={item.name}
          secondaryText={item.description}
          secondaryTextLines={2}
          onClick={this.itemOnClick}
        />
        <mui.ListDivider />
      </div>
    );
  }
});

module.exports = ListItem;
