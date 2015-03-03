//app/assets/javascripts/components/ShowcaseLink.jsx
var React = require('react');

var ShowcaseLink = React.createClass({
  mixins: [CollectionUrlMixin],

  displayName: 'Showcase Link',

  propTypes: {
    showcase: React.PropTypes.object.isRequired,
  },

  render: function() {
    var showcase = this.props.showcase;
    var title = this.props.title || showcase.title;
    return (
      <div>
        <a className={this.props.className} href={this.showcaseUrl(showcase)}>
        <Thumbnail image={showcase.image} thumbnailType="medium" />
        <div>{title}</div>
        </a>
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = ShowcaseLink;
