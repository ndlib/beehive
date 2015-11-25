var React = require('react');
var mui = require('material-ui');

var AboutPage = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin],

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded)
      return null;

    var pageContent = (<Loading/>);
    if(this.state.collection && this.state.collection.about) {
      pageContent = (
        <PagesShow title="About" content={this.state.collection.about} />
      )
    }

    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} branding={true}/>
          <PageContent>
            {pageContent}
          </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    )
  }
});

module.exports = AboutPage;
