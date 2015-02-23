//app/assets/javascripts/components/PreviousSection.jsx
var React = require('react');

var PreviousSection = React.createClass({
  displayName: 'Collection Link',
  propTypes: {
    section: React.PropTypes.object.isRequired,

  },

  render: function() {
    var section = this.props.section;
    var url = "/" + encodeURIComponent(section['id']) + "/" + encodeURIComponent(section['slug']);
    if (this.props.path) {
      url = url + '/' + this.props.path;
    }
    var title = this.props.title || section.title;
    return (
      <div>
        <h4>Previous Section</h4>
        <div>{this.props.section.nextSection.id}</div>
        <div>{this.props.section.nextSection.slug}</div>
        <div>{this.props.section.nextSection.title}</div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = PreviousSection;
