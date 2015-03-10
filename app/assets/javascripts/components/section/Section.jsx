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
      border: '1px solid lightgrey',
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

  render: function() {
    var image;
    if (this.props.section.image) {
      image = (<SectionImage section={this.props.section} />);
    }
    return (
      <section className="section" style={this.style()} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} >
      <a href={this.sectionUrl(this.props.section)} style={this.linkStyle()}>
        {image}
        <SectionDescription section={this.props.section} />
        </a>
      </section>
    );
  }
});

// each file will export exactly one component
module.exports = Section;