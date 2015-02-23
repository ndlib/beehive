//app/assets/javascripts/components/ShowcaseLink.jsx
var React = require('react');

var ShowcaseLink = React.createClass({
  displayName: 'Showcase Link',
  propTypes: {
    showcase: React.PropTypes.object.isRequired,
  },
  render: function() {
    var showcase = this.props.showcase;
    var url = document.URL + "/showcases/" + encodeURIComponent(showcase['id']) + "/" + encodeURIComponent(showcase['slug']);
    if (this.props.path) {
      url = url + '/' + this.props.path;
    }
    var title = this.props.title || showcase.title;
    console.log(showcase);
    return (
      <div>
        <a className={this.props.className} href={url}>
        <Thumbnail image={showcase.image} thumbnailType="small" />
        <div>{title}</div>
        </a>
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = ShowcaseLink;
