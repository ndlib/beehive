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

const LoadRemote = require('../../modules/LoadRemote.jsx')

var Collection = React.createClass({
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
    if ('object' == typeof(this.props.collection)) {
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
