//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin, TitleConcatMixin],

  propTypes: {
    collection: React.PropTypes.object.isRequired,
    branding: React.PropTypes.bool,
    dropdown: React.PropTypes.bool,
  },

  render: function() {
    var dropdown = "";
    if(this.props.collection['@id'] && this.props.dropdown) {
      dropdown = (<ShowcaseDropDown collection={this.props.collection} />);
    }

    var fullName = this.titleConcat(this.props.collection.name_line_1, this.props.collection.name_line_2)
    var title = <span className="title" key={1}>{fullName}</span>;

    var content = this.props.children;
    return (
    <PageHeader branding={this.props.branding}>
      <TitleBar>
        {dropdown}
        <a className="navbar-brand overflow-ellipsis" href={this.collectionUrl(this.props.collection)}>
          {title}
        </a>
      </TitleBar>
      {content}
    </PageHeader>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
