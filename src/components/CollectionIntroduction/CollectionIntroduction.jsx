'use strict'
var React = require("react");
var mui = require('material-ui');

var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx');
var PageContent = require('../../layout/PageContent.jsx');
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx');
var CollectionDescription = require('./CollectionDescription.jsx');

var CollectionIntroduction = React.createClass({
  mixins: [
    require("../../mixins/LoadRemoteMixin.jsx"),
    require("../../mixins/MuiThemeMixin.jsx")
  ],

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
          <CollectionDescription collection={this.state.collection} />
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    );
  }
});

module.exports = CollectionIntroduction;
