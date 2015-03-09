//app/assets/javascripts/components/ItemEmbed.jsx
var React = require('react');

var ItemEmbed = React.createClass({
  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    console.log('gi');
    return {
      collection: {},
      item: null,
    };
  },

  componentDidMount: function() {
    console.log('cdi');
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
      item: collection.items,
    });
  },

  render: function() {
    return (
      <ItemShow item={this.state.item} />
    );
  }
});

// each file will export exactly one component
module.exports = ItemEmbed;
