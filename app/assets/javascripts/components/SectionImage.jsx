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

  captionStyle: function() {
    return {
      backgroundColor: 'white',
      position: 'absolute',
      bottom: '2em',
      right: '1em',
      padding: '0.5em',
      whiteSpace: 'normal',
    };
  },

  imageStyle: function() {
    return {
      height: '100%',
    };
  },

  render: function () {
    var caption = "";
    if (this.props.section.caption) {
      caption = (<div className="section-caption" style={this.captionStyle()}>{this.props.section.caption}</div>)
    }

    return (
      <div className="section-container section-container-image" style={this.style()}>
        <Thumbnail image={this.props.section.image} thumbnailType="medium" style={this.imageStyle()} />
        { caption }
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = SectionImage;
