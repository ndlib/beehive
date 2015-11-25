var React = require('react');
var mui = require('material-ui');

var Page = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin],

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
    });
  },

  render: function() {
    var pageContent = (<Loading/>);
    var pageName;
    if(this.state.collection && this.state.collection.pages) {
      pageName = this.state.collection.pages.name;
      pageContent = this.state.collection.pages.content;

    }

    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} branding={true}/>
          <PageContent>
            <PagesShow title={pageName} content={pageContent} />
          </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    )
  }
});

module.exports = Page;