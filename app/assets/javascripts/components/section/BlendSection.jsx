//app/assets/javascripts/components/BlendSection.jsx
var React = require('react');

var BlendSection = React.createClass({
  mixins: [CollectionUrlMixin],
  displayName: 'Section',

  propTypes: {
    height: React.PropTypes.number.isRequired,
  },

  getInitialState: function() {
    return {
      hover: false
    };
  },

  style: function() {
    return {
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      marginRight: '20px',
      height: this.props.height + 'px',
      cursor: 'pointer',
      lineHeight: '20px',
    };
  },

  onMouseEnter: function() {
  /*
    return this.setState({
      hover: true
    });
    */
  },

  onMouseLeave: function() {
  /*
    return this.setState({
      hover: false
    });
    */
  },

  onClick: function(event) {
  /*
    event.preventDefault();
    window.location.hash = "modal-343";
    */
  },

  sectionName: function() {
    return "section-343";
  },

  render: function() {

    return (
      <section className="section" style={this.style()} id={this.sectionName()} >
        <SectionDescription height={this.props.height} section="Section description" />
        <Section3DScene height={this.props.height} />
      </section>
    );
  }
});

// each file will export exactly one component
module.exports = BlendSection;
