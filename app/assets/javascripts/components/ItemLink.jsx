//app/assets/javascripts/components/ItemLink.jsx
var React = require('react');

var ItemLink = React.createClass({
  displayName: 'Item Link',
  propTypes: {
    section: React.PropTypes.object.isRequired,

  },

  render: function() {
    var item = this.props.item;
    var url = document.URL + "/items/" + encodeURIComponent(item['id']) + "/" + encodeURIComponent(item['slug']);
    return (
      <div>
        <h4><a href={url}>Item</a></h4>
        <div>{item.id}</div>
        <div>{item.slug}</div>
        <div>{item.title}</div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ItemLink;
