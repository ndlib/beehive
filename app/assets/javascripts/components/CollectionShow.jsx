//app/assets/javascripts/components/CollectionShow.jsx
var React = require('react');

var CollectionShow = React.createClass({
  displayName: 'Collection Show',

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  render: function() {
    if (this.props.collection) {
      return (
        <div className="jumbotron">
          <div className="container collection-show">
            <h1>{this.props.collection.title}</h1>
            <p dangerouslySetInnerHTML={{__html: this.props.collection.description}} />
            <Thumbnail image={this.props.collection.image} thumbnailType="small" />
          </div>
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }
  }
});

// each file will export exactly one component
module.exports = CollectionShow;
