//app/assets/javascripts/components/Section.jsx
var React = require('react');

var Section = React.createClass({
  displayName: 'Section',

  propTypes: {
    section: React.PropTypes.object.isRequired,
  },

  style: function() {
    return {
      border: '1px solid lightgrey',
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      marginLeft: '10px',
      marginRight: '10px',
      height: '100%',
    }
  },


  render: function() {
    return (
      <div className="section" style={this.style()}>
        <SectionImage section={this.props.section} />
        <SectionDescription section={this.props.section} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = Section;
