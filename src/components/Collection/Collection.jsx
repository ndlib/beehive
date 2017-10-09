'use strict'
var React = require('react');
var mui = require('material-ui');

var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx');
var CollectionShow = require('./CollectionShow.jsx');
var PageContent = require('../../layout/PageContent.jsx');
var CollectionIntro = require('./CollectionIntro.jsx');
var CollectionShowSitePath = require('./CollectionShowSitePath.jsx');
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx');
var PageTitle = require('../../modules/PageTitle.js')
var Collection = React.createClass({
  mixins: [
    require("../../mixins/LoadRemoteMixin.jsx"),
    require("../../mixins/MuiThemeMixin.jsx")
  ],

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
  },

  componentWillMount: function(){
    document.body.className = document.body.className + " collection";
  },

  style: function() {
      return ({
        marginTop:'-64px',
      });
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null;
    }
    PageTitle(this.state.collection.name)
    return (
      <mui.AppCanvas>
        <div className="collection-show-page">
            <CollectionPageHeader collection={this.state.collection} branding={true} />
            <CollectionShow collection={this.state.collection} />
            <PageContent fluidLayout={false}>
              <CollectionIntro collection={this.state.collection} />
              <CollectionShowSitePath collection={this.state.collection} />
            </PageContent>
            <CollectionPageFooter collection={this.state.collection} />
        </div>
      </mui.AppCanvas>
    );
  }
});

// each file will export exactly one component
module.exports = Collection;
