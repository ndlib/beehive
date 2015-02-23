//app/assets/javascripts/components/PreviousSection.jsx
var React = require('react');

var PreviousSection = React.createClass({
  displayName: 'Previous Section Link',
  propTypes: {
    section: React.PropTypes.object.isRequired,

  },

  render: function() {
    console.log(this.props);
    var section = this.props.section;
    var url = "/" + encodeURIComponent(section['id']) + "/" + encodeURIComponent(section['slug']);
    return (
      <div>
        <h4>Previous Section</h4>
        <div>{section.id}</div>
        <div>{section.slug}</div>
        <div>{section.title}</div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = PreviousSection;
