//app/assets/javascripts/components/CollectionShow.jsx
var React = require('react');

var CollectionShow = React.createClass({
  displayName: 'Collection Show',
    propTypes: {
      collectionsUrl: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      collection: null,
    };
  },

  componentDidMount: function() {
    $.get(this.props.collectionsUrl, function(result) {
      this.setState({
        collection: result,
      })
    }.bind(this));
  },

  render: function() {
    if (this.state.collection) {
      return (
        <div className="jumbotron">
          <div className="container collection-show">
            <h1>{this.state.collection.title}</h1>
            <p dangerouslySetInnerHTML={{__html: this.state.collection.description}} />
            <Thumbnail image={this.state.collection.image} thumbnailType="small" />
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
