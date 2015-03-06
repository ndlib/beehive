//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  render: function() {
    var itemBrowseUrl = "/" + this.props.collection.id + "/" + this.props.collection.slug + "/items";
    return (
      <PageHeader>
        <TitleBar>
          <a className="navbar-brand" href={this.collectionUrl(this.props.collection)}>
            {this.props.collection.title}
          </a>
          <ul className="nav navbar-nav navbar-right">
            <li><a href={itemBrowseUrl}>Browse Items</a></li>
          </ul>
        </TitleBar>
      </PageHeader>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
