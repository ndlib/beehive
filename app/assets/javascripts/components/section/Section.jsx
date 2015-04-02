//app/assets/javascripts/components/Section.jsx
var React = require('react');

var Section = React.createClass({
  mixins: [CollectionUrlMixin],
  displayName: 'Section',

  propTypes: {
    section: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      hover: false
    };
  },

  linkStyle: function() {
    return {
      display: 'block',
      height: '100%',
      color: 'inherit',
    };
  },

  style: function() {
    return {
      //border: '1px solid lightgrey',
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      marginLeft: '10px',
      marginRight: '10px',
      height: '100%',
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

  onClick: function() {
    window.location.hash = "modal-" + this.props.section.id;
  },

  targetID: function() {
    return "#modal-" + this.props.section.id;
  },

  render: function() {

    return (
      <section className="section" style={this.style()} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} >
      <a href={this.targetID()} data-toggle="modal" data-target={this.targetID()} style={this.linkStyle()} onClick={this.onClick}>
        <SectionDescription section={this.props.section} />
        <SectionImage section={this.props.section}/>
        </a>
      </section>
    );
  }
});

// each file will export exactly one component
module.exports = Section;
