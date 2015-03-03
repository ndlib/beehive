//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var CollectionPageHeader = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
  },

  render: function() {
    var url = "/" + encodeURIComponent(this.props.collection.id) + "/" + encodeURIComponent(this.props.collection.slug);
    return (
      <PageHeader>
        <TitleBar>
          <a className="navbar-brand" href={url}>
            {this.props.collection.title}
          </a>
        </TitleBar>
      </PageHeader>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
