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
    <a href={this.sectionUrl(section)} className="prev-button half-circle-button">
      <div className="direction">&lsaquo;</div>
    </a>
    );
  }
});

// each file will export exactly one component
module.exports = PreviousSection;
