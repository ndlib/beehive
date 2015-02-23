//app/assets/javascripts/components/NextSection.jsx
var React = require('react');

var NextSection = React.createClass({
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
        <h4>Next Section</h4>
        <div>{this.props.section.previousSection.id}</div>
        <div>{this.props.section.previousSection.slug}</div>
        <div>{this.props.section.previousSection.title}</div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = NextSection;
