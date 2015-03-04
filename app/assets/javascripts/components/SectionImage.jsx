//app/assets/javascripts/components/SectionImage.jsx
var React = require('react');

var SectionImage = React.createClass({
  displayName: 'Section Image',

  propTypes: {
    section: React.PropTypes.object.isRequired
  },

  style: function() {
    return {
      height: '100%',
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
    };
  },

  imageStyle: function() {
    return {
      height: '100%',
    };
  },

  render: function () {
    return (
      <div className="section-container section-container-image" style={this.style()}>
        <Thumbnail image={this.props.section.image} thumbnailType="medium" style={this.imageStyle()} title={this.props.section.title} alt={this.props.section.caption} />
        <SectionCaption caption={this.props.section.caption} />
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = SectionImage;
