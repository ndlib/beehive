//app/assets/javascripts/components/SectionShow.jsx
var React = require('react');

var SectionShowDescription = React.createClass({
  displayName: 'Section Show Description',
  propTypes: {
    section: React.PropTypes.object.isRequired,
    height: React.PropTypes.number,
  },

  styles: function() {
    if (this.props.height) {
      return {
        height: this.props.height + 'px',
        overflowY: 'scroll',
      };
    } else {
      return {};
    }
  },

  render: function() {
    return (
      <EssayContent content={this.props.section.description} />
    );
  }

});

// each file will export exactly one component
module.exports = SectionShowDescription;
