'use strict'
var React = require('react');
var mui = require('material-ui');

var Collection = React.createClass({
  mixins: [LoadRemoteMixin, MuiThemeMixin],

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      });
    } else {
      this.loadRemoteCollection(this.props.collection);
    }
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
    });
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
    return (
      <mui.AppCanvas>
        <div className="collection-show-page">
          <Layout>
            <CollectionPageHeader collection={this.state.collection} branding={true} />
            <CollectionShow collection={this.state.collection} style={this.style()}/>
            <PageContent>
              <CollectionIntro collection={this.state.collection} />
              <CollectionShowShowcases collection={this.state.collection} />
            </PageContent>
            <CollectionPageFooter collection={this.state.collection} />
          </Layout>
        </div>
      </mui.AppCanvas>
    );
  }
});

// each file will export exactly one component
module.exports = Collection;
