//app/assets/javascripts/components/collection/CollectionShowShowcases.jsx
var React = require('react');

var CollectionShowShowcases = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  intro: function() {
    return (
      <CollectionIntroCard collection={this.props.collection} />
    );
  },

  render: function() {
    if (this.props.collection.showcases) {
      return (
        <ShowcasesCardList showcases={this.props.collection.showcases} intro={this.intro()} />
      );
    } else {
      return (
        <div />
      );
    }
  }
});

// each file will export exactly one component
module.exports = CollectionShowShowcases;
