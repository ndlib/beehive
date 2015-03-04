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

  style: function() {
    return {
      border: '1px solid lightgrey',
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
      marginLeft: '10px',
      marginRight: '10px',
      height: '100%',
      cursor: (this.state.hover ? 'pointer' : 'auto'),
    }
  },
  click: function () {
    window.location.replace(this.sectionUrl(this.props.section));
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
      <div className="section" style={this.style()} onClick={this.click} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} >
        {image}
        <SectionDescription section={this.props.section} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = Section;
