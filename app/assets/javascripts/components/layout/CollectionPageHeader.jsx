//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    branding: React.PropTypes.bool,
  },

  render: function() {
    var dropdown = "";
    if(this.props.collection['@id']) {
      dropdown = (<ShowcaseDropDown collection={this.props.collection} />);
    }
    return (
    <PageHeader branding={this.props.branding}>
        <TitleBar>
          {dropdown}
          <a className="navbar-brand" href={this.collectionUrl(this.props.collection)}>
            <span className="title">{this.props.collection.title_line_1}</span>
            <span className="subtitle">{this.props.collection.title_line_2}</span>
          </a>
        </TitleBar>
      </PageHeader>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
