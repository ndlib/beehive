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
        <div style={{top: '4px', left: '16px', width: '77px', height: '75px'}}>
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
          leftIcon={avatar}
          primaryText={name}
          secondaryText={description}
          secondaryTextLines={2}
          onClick={this.itemOnClick}
          innerDivStyle={{paddingLeft:'80px', height:'85px'}}
        />
      <mui.ListDivider inset={true} style={{marginLeft: "130px" }} />
      </div>
    );
  }
});

module.exports = ListItem;
