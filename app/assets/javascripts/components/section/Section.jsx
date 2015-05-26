//app/assets/javascripts/components/Section.jsx
var React = require('react');

var Section = React.createClass({
  mixins: [CollectionUrlMixin],
  displayName: 'Section',

  propTypes: {
    section: React.PropTypes.object.isRequired,
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
      marginRight: '10px',
      height: this.props.height + 'px',
      cursor: 'pointer',
    };
  },

  onMouseEnter: function() {
    return this.setState({
      hover: true
    });
  },

  onMouseLeave: function() {
    return this.setState({
      hover: false
    });
  },

  onClick: function(event) {
    event.preventDefault();
    window.location.hash = "modal-" + this.props.section.id;
  },

  sectionName: function() {
    return "section-" + this.props.section.id;
  },

  render: function() {

    return (
      <section className="section" style={this.style()} id={this.sectionName()} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
        <SectionDescription height={this.props.height} section={this.props.section} />
        <SectionImage height={this.props.height} section={this.props.section}/>
      </section>
    );
  }
});

// each file will export exactly one component
module.exports = Section;
