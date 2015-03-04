//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  render: function() {
    return (
      <PageHeader>
        <TitleBar>
          <a className="navbar-brand" href={this.collectionUrl(this.props.collection)}>
            {this.props.collection.title}
          </a>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Right Side Link</a></li>
          </ul>
        </TitleBar>
      </PageHeader>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
