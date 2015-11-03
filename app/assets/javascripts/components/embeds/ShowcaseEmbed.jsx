//app/assets/javascripts/components/ShowcaseEmbed.jsx
var React = require('react');

var ShowcaseEmbed = React.createClass({
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
      showcase: null,
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
      this.setValues(result);
    }.bind(this));
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
      showcase: collection.showcases,
      params: this.props.params,
    });
  },

  render: function() {
    if (this.state.showcase != null) {
      return (
        <div className="showcase">
          <h2>{this.state.showcase.name}</h2>
          <HoneycombImage image={this.state.showcase.image} size="small" />
          <p dangerouslySetInnerHTML={{__html: this.state.showcase.description}} />
        </div>
      );
    }
    else {
      return (<Loading />);
    }
  }
});

// each file will export exactly one component
module.exports = ShowcaseEmbed;
