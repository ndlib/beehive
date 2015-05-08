//app/assets/javascripts/components/CollectionLink.jsx
var React = require('react');

var CollectionLink = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Collection Link',

  propTypes: {
    collection: React.PropTypes.object.isRequired,

  },

  render: function() {
    var collection = this.props.collection;
    var title = this.props.name || collection.name;
    return (
      <div>
        <a className={this.props.className} href={this.collectionUrl(collection)}>
        <Thumbnail image={collection.image} thumbnailType="medium" />
        <div>{title}</div>
        </a>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionLink;
