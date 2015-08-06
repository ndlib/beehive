//app/assets/javascripts/components/CollectionsList.jsx
var React = require('react');

var CollectionsListPage = React.createClass({
  mixins: [LoadRemoteMixin],
  displayName: 'Collections List Page',

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
    );
  }

});

// each file will export exactly one component
module.exports = CollectionsListPage;
