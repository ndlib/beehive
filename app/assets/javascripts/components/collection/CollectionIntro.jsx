var React = require('react');

var CollectionIntro = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <div className="collection-introduction" dangerouslySetInnerHTML={{__html: this.props.collection.short_description}} />
    );
  }
});

module.exports = CollectionIntro;
