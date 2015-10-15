'use strict'
var React = require('react');
var mui = require('material-ui');

var SiteIndex = React.createClass({
  mixins: [LoadRemoteMixin],

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
        <BrandBar/>
        <PageContent fluidLayout={true}>
          <mui.Card>
            <mui.CardMedia
              overlay={<mui.CardTitle
                title="Digital Collections"
                subtitle="Powered by HoneyComb"
              />}
              >
              <img src="/assets/home.jpg"/>
            </mui.CardMedia>
          </mui.Card>
          <PageContent fluidLayout={false}>
            <h2>Featured Collections</h2>
            <CollectionsList collections={this.state.collections} />
          </PageContent>
        </PageContent>
      </mui.AppCanvas>
    );
  }

});

// each file will export exactly one component
module.exports = SiteIndex;
