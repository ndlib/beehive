'use strict'
var React = require('react');
var mui = require('material-ui');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var BeehiveTheme = require('../../themes/beehive.jsx');
var SiteIndexHeader = require("./SiteIndexHeader.jsx");
var BrandBar = require('../../layout/BrandBar.jsx');
var PageContent = require('../../layout/PageContent.jsx');
var CollectionsList = require('./CollectionsList.jsx');
var IndexPageFooter = require('../../layout/IndexPageFooter.jsx');

const LoadRemote = require('../../modules/LoadRemote.jsx')

var SiteIndex = React.createClass({
  propTypes: {
    collections: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState: function() {
    return {
      collections: [],
      remoteCollectionLoaded: false,
      muiTheme: ThemeManager.getMuiTheme(BeehiveTheme),
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collections)) {
      this.setState({
        collections: this.props.collections,
      });
    } else {
      LoadRemote.loadRemoteCollection(this.props.collections, this.setValues.bind(this))
    }
  },

  setValues: function(collections) {
    this.setState({
      remoteCollectionLoaded: true,
      collections: collections,
    });
    return true;
  },

  componentWillMount: function(){
    document.body.className = document.body.className + " bee-light-theme collections-bg";
  },

  cardMedia: function() {
    return(
      <div>
      </div>
    );
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null;
    }

    return (
      <mui.AppCanvas>
        <BrandBar/>
        <PageContent fluidLayout={true}>
          <SiteIndexHeader />
          <PageContent fluidLayout={false}>
            <h2>Featured Collections</h2>
            <CollectionsList collections={this.state.collections} />
          </PageContent>
        </PageContent>
        <IndexPageFooter />
      </mui.AppCanvas>
    );
  }

});

// each file will export exactly one component
module.exports = SiteIndex;
