//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    branding: React.PropTypes.bool,
  },

  render: function() {
    var itemBrowseUrl = "/" + this.props.collection.id + "/" + this.props.collection.slug + "/items";
    var showcaseBrowseUrl = "/" + this.props.collection.id + "/" + this.props.collection.slug + "/showcases";
    return (
    <PageHeader branding={this.props.branding}>
        <TitleBar>
          <a className="navbar-brand" href={this.collectionUrl(this.props.collection)}>
            {this.props.collection.title}
          </a>
        </TitleBar>
      </PageHeader>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
