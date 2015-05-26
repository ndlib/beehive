//app/assets/javascripts/components/SectionsListItem.jsx
var React = require('react');

var CollectionPageHeader = React.createClass({
  mixins: [CollectionUrlMixin],

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

    var title = [];
    title.push((<span className="title" key={1}>{this.props.collection.name_line_1}</span>));

    if(this.props.collection.name_line_2) {
      title.push((<span className="subtitle" key={2}>{this.props.collection.name_line_2}</span>));
    }

    return (
    <PageHeader branding={this.props.branding}>
        <TitleBar>
          {dropdown}
          <a className="navbar-brand" href={this.collectionUrl(this.props.collection)}>
            {title}
          </a>
        </TitleBar>
      </PageHeader>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
