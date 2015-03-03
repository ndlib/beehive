//app/assets/javascripts/components/SectionLink.jsx
var React = require('react');

var SectionLink = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Section Link',

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
  },

  render: function() {
    var section = this.props.section;
    var title = this.props.title || section.title;
    return (
      <div>
        <a className={this.props.className} href={this.sectionUrl(section)}>
        <Thumbnail image={section.image} thumbnailType="medium" />
        <div>{title}</div>
        </a>
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = SectionLink;
