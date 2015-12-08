'use strict'
var React = require("react");
var mui = require('material-ui');

var CollectionIntroduction = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin],

  componentDidMount: function() {
    if ("object" == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null;
    }
    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} >
          <div className="bee-page-title-bar"><h2 className="bee-page-title-bar-title">Introduction</h2></div>
        </CollectionPageHeader>
        <PageContent>
          <div style={{maxWidth:'960px', margin:'0 auto'}}>
            <CollectionDescription collection={this.state.collection} />
          </div>
        </PageContent>

        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    );
  }
});

module.exports = CollectionIntroduction;
