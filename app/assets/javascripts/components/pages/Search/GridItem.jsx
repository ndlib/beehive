'use strict'
var React = require('react');
var mui = require('material-ui');

var GridItem = React.createClass({
  mixins: [ LoadRemoteMixin],
  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  render: function() {
    var item = this.props.item;
    var name = (
      <span style={{fontFamily: 'GPCMed'}}>
        {item.name}
      </span>
    );

    return (
      <mui.Card
        onClick={this.itemOnClick}
        style={{cursor: 'pointer'}}
      >
        <mui.CardMedia
          overlay={<mui.CardTitle title={name}/>}
        >
          <ItemImage image={item.image} />
        </mui.CardMedia>
      </mui.Card>
    );
  }
});

module.exports = GridItem;
