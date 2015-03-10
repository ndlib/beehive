//app/assets/javascripts/components/CollectionEmbed.jsx
var React = require('react');

var CollectionEmbed = React.createClass({
  displayName: 'Collection Show Page',

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    params: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      collection: {},
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection()
    }
  },

  loadRemoteCollection: function() {
    $.get(this.props.collection, function(result) {
      this.setState({
        collection: result,
      });
    }.bind(this));
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
      params: this.props.params,
    });
  },

  render: function() {
    var showcasesList;
    if (this.state.collection.showcases) {
      showcasesList = (
        <ShowcasesList showcases={this.state.collection.showcases} />
      );
    }
    return (
        <div className="collection">
          <CollectionShow collection={this.state.collection} />
          {showcasesList}
        </div>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionEmbed;
