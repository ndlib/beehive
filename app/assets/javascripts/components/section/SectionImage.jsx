//app/assets/javascripts/components/SectionImage.jsx
var React = require('react');

var SectionImage = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Section Image',

  propTypes: {
    section: React.PropTypes.object.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  style: function() {
    return {
      height: this.props.height + 'px',
      display: 'inline-block',
      verticalAlign: 'top',
      position: 'relative',
    };
  },

  imageStyle: function() {
    var aspectRatio = parseInt(this.props.section.item.image.width) / parseInt(this.props.section.item.image.height);
    return {
      height: this.props.height + 'px',
      width: Math.round(this.props.height * aspectRatio) + 'px',
    };
  },

  render: function () {
    if (this.props.section.item != null) {
      var transcriptIcon = '';
      if (this.props.section.item.metadata["transcription"]) {
        transcriptIcon = (<img src="/images/blank.png" className="section-transcript" title="Click to view transcript" alt="Click to view transcription" />);
      }

      return (
        <div className="section-container section-container-image" style={this.style()}>
            <Thumbnail image={this.props.section.item.image} thumbnailType="medium" style={this.imageStyle()} title={this.props.section.name} alt={this.props.section.caption} />
            <SectionCaption caption={this.props.section.caption} />
            {transcriptIcon}
        </div>
      );
    } else {
      return (<div />);
    }
  }

});

// each file will export exactly one component
module.exports = SectionImage;
