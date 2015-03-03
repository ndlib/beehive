//app/assets/javascripts/components/ItemLink.jsx
var React = require('react');

var ItemLink = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Item Link',

  propTypes: {
    item: React.PropTypes.object.isRequired,
  },

  render: function() {
    var item = this.props.item;
    return (
      <div>
        <h4><a href={this.itemUrl(item)}>Item</a></h4>
        <div>{item.id}</div>
        <div>{item.slug}</div>
        <div>{item.title}</div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ItemLink;
