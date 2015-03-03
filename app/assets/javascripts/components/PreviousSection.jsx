//app/assets/javascripts/components/PreviousSection.jsx
var React = require('react');

var PreviousSection = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Previous Section Link',

  propTypes: {
    section: React.PropTypes.object.isRequired,

  },

  render: function() {
    var section = this.props.section;
    return (
      <div>
        <h4><a href={this.sectionUrl(section)}>Previous Section</a></h4>
        <div>{section.id}</div>
        <div>{section.slug}</div>
        <div>{section.title}</div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = PreviousSection;
