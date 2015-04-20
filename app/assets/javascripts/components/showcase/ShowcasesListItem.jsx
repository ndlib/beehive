//app/assets/javascripts/components/ShowcasesListItem.jsx
var React = require('react');

var ShowcasesListItem = React.createClass({
  displayName: 'Showcase List Item',
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
  },
  render: function() {
      return (
        <ShowcaseLink showcase={this.props.showcase} showDescription={true} thumbnailType="medium" />
    );
  }
});

// each file will export exactly one component
module.exports = ShowcasesListItem;
