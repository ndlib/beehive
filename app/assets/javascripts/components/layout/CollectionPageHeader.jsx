'use strict'
var React = require('react');
var mui = require('material-ui');

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

    var title = (
      <a className="navbar-brand overflow-ellipsis" href={this.collectionUrl(this.props.collection)}>
        {this.props.collection.name_line_1}
      </a>
    );
    return (
    <PageHeader>
      <BrandBar />
      <mui.AppBar
        title={title}
        iconClassNameRight="mdi-navigation-expand-more" />

      <TitleBar>
        {dropdown}
        <a className="navbar-brand overflow-ellipsis" href={this.collectionUrl(this.props.collection)}>
          {title}
        </a>
      </TitleBar>
    </PageHeader>
    );
  }
});

// each file will export exactly one component
module.exports = CollectionPageHeader;
