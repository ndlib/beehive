//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  render: function() {
    var itemBrowseUrl = "/" + this.props.collection.id + "/" + this.props.collection.slug + "/items";
    var showcaseBrowseUrl = "/" + this.props.collection.id + "/" + this.props.collection.slug + "/showcases";
    return (
      <PageHeader>
        <TitleBar>
          <a className="navbar-brand" href={this.collectionUrl(this.props.collection)}>
            {this.props.collection.title}
          </a>
          <ul className="nav navbar-nav navbar-left">
            <li><p>|</p></li>
            <li><a href={showcaseBrowseUrl}>Showcases</a></li>
            <li><p>|</p></li>
            <li><a href={itemBrowseUrl}>Items</a></li>
          </ul>
        </TitleBar>
      </PageHeader>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
