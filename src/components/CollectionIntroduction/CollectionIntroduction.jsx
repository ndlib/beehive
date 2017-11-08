'use strict'
var React = require("react");
var mui = require('material-ui');

var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx');
var PageContent = require('../../layout/PageContent.jsx');
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx');
var CollectionDescription = require('./CollectionDescription.jsx');
var PageTitleBar = require('../Pages/PageTitleBar.jsx');

const LoadRemote = require('../../modules/LoadRemote.jsx')

var CollectionIntroduction = React.createClass({
  mixins: [
    require("../../mixins/MuiThemeMixin.jsx")
  ],

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
      remoteCollectionLoaded: false,
    };
  },

  componentDidMount: function() {
    if ("object" == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      LoadRemote.loadRemoteCollection(this.props.collection, this.onLoaded.bind(this));
    }
  },

  onLoaded: function(result) {
    this.setState({
      remoteCollectionLoaded: true,
      collection: result
    })
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null;
    }
    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} >
          <PageTitleBar title="Introduction" height={35}/>
        </CollectionPageHeader>
        <div id="TitleSpacer" style={{ height: 35, width: "100%" }} />
        <PageContent>
          <CollectionDescription collection={this.state.collection} />
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    );
  }
});

module.exports = CollectionIntroduction;
