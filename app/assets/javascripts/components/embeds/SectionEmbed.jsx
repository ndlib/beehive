//app/assets/javascripts/components/SectionEmbed.jsx
var React = require('react');

var SectionEmbed = React.createClass({
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
      section: null
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
      section: collection.showcases.sections,
      params: this.props.params,
    });
  },

  render: function() {
    return (
      <SectionShow section={this.state.section} />
    );
  }
});

// each file will export exactly one component
module.exports = SectionEmbed;
