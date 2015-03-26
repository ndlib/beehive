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

  render: function () {
    if (this.props.section.item != null) {
      var transcriptIcon = '';
      this.props.section.item.metadata.forEach(function(i){
        if(i.label === "Transcript") {
          transcriptIcon = (<img src="/assets/transcript.gif" className="section-transcript"/>);
        }
      });

      return (
        <div className="section-container section-container-image" style={this.style()}>
            <Thumbnail image={this.props.section.item.image} thumbnailType="medium" style={this.imageStyle()} title={this.props.section.title} alt={this.props.section.caption} />
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
