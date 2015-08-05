var React = require('react');

var CollectionIntro = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
    height: React.PropTypes.string,
    id: React.PropTypes.string,
  },

  render: function() {
    return (
      <div className="collection-short-intro-container" id={this.props.id}>
        <div className="collection-short-intro" dangerouslySetInnerHTML={{__html: this.props.collection.short_description}} />
      </div>
    );
  }
});

module.exports = CollectionIntro;
