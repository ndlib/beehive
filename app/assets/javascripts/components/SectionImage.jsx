//app/assets/javascripts/components/SectionImage.jsx
var React = require('react');

var SectionImage = React.createClass({
  mixins: [CollectionUrlMixin],

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

  linkStyle: function() {
    return {
      display: 'block',
      height: '100%',
      color: 'inherit',
    };
  },

  render: function () {
    return (
      <div className="section-container section-container-image" style={this.style()}>
        <a href={this.sectionUrl(this.props.section)} style={this.linkStyle()}>
          <Thumbnail image={this.props.section.image} thumbnailType="medium" style={this.imageStyle()} title={this.props.section.title} alt={this.props.section.caption} />
          <SectionCaption caption={this.props.section.caption} />
        </a>
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = SectionImage;
