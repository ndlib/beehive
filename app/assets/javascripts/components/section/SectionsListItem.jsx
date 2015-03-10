//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var SectionsListItem = React.createClass({
  displayName: 'Sections List Item',
  propTypes: {
    section: React.PropTypes.object.isRequired,
  },
  render: function() {
      return (
      <div className="well section-list-item">
        <SectionLink section={this.props.section} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = SectionsListItem;
