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
    <a href={this.sectionUrl(section)} className="next-button half-circle-button">
      <div className="direction">&rsaquo;</div>
    </a>
    );
  }
});

// each file will export exactly one component
module.exports = NextSection;
