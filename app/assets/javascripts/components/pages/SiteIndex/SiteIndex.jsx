'use strict'
var React = require('react');
var mui = require('material-ui');
var SiteIndexHeader = require("./SiteIndexHeader");

var SiteIndex = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin],

  propTypes: {
    collections: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
  },

  getInitialState: function() {
    return {
      collections: [],
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collections)) {
      this.setState({
        collections: this.props.collections,
      });
    } else {
      this.loadRemoteCollection(this.props.collections)
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
