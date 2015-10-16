'use strict'
var React = require('react');
var mui = require('material-ui');

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
      collections: collections,
    });
  },

  componentWillMount: function(){
    document.body.className = document.body.className + " bee-light-theme collections-bg";
  },

  render: function() {
    return (
      <mui.AppCanvas>
        <Layout>
          <PageHeader branding={true} />
          <PageContent>
            <div className="banner bee-homepage-banner">
              <div className="banner-inner">
                <h1>Digital Collections</h1>
                <h3>Powered by HoneyComb</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h2>Featured Collections</h2>
              </div>
            </div>
            <CollectionsList collections={this.state.collections} />
          </PageContent>
        </Layout>
      </mui.AppCanvas>
    );
  }

});

// each file will export exactly one component
module.exports = SiteIndex;
