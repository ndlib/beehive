//app/assets/javascripts/components/NextSection.jsx
var React = require('react');

var NextSection = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Next Section Link',

  propTypes: {
    section: React.PropTypes.object.isRequired,

  },

  render: function() {
    var section = this.props.section;
    return (
      <div>
        <h4><a href={this.sectionUrl(section)}>Next Section</a></h4>
        <div>{section.id}</div>
        <div>{section.slug}</div>
        <div>{section.title}</div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = NextSection;
