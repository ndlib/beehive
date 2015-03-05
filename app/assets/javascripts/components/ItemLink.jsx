//app/assets/javascripts/components/ItemLink.jsx
var React = require('react');

var ItemLink = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Item Link',

  propTypes: {
    item: React.PropTypes.object.isRequired,
    thumbnailType: React.PropTypes.string,
  },

  render: function() {
    var item = this.props.item;
    return (
      <div>
        <a className={this.props.className} href={this.itemUrl(item)}>
        <Thumbnail image={item.image} thumbnailType={ this.props.thumbnailType === 'undefined' ? "medium" : this.props.thumbnailType} />
        <div>{item.title}</div>
        </a>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ItemLink;
