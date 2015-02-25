//app/assets/javascripts/components/CollectionLink.jsx
var React = require('react');

var CollectionLink = React.createClass({
  displayName: 'Collection Link',
  propTypes: {
    collection: React.PropTypes.object.isRequired,

  },

  render: function() {
    var collection = this.props.collection;
    var url = "/" + encodeURIComponent(collection['id']) + "/" + encodeURIComponent(collection['slug']);
    if (this.props.path) {
      url = url + '/' + this.props.path;
    }
    var title = this.props.title || collection.title;
    return (
      <div>
        <a className={this.props.className} href={url}>
        <Thumbnail image={collection.image} thumbnailType="medium" />
        <div>{title}</div>
        </a>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionLink;
