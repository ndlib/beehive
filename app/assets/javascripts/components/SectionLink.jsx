//app/assets/javascripts/components/SectionLink.jsx
var React = require('react');

var SectionLink = React.createClass({
  displayName: 'Section Link',
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
  },
  render: function() {
    var section = this.props.section;
    var url = document.URL + "/sections/" + encodeURIComponent(section['id']) + "/" + encodeURIComponent(section['slug']);
    if (this.props.path) {
      url = url + '/' + this.props.path;
    }
    var title = this.props.title || section.title;
    return (
      <div>
        <a className={this.props.className} href={url}>
        <Thumbnail image={section.image} thumbnailType="medium" />
        <div>{title}</div>
        </a>
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = SectionLink;
