'use strict'
var React = require("react");
var mui = require('material-ui');

var CollectionIntroduction = React.createClass({
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
    if ("object" == typeof(this.props.collection)) {
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

  render: function() {
    var nextShowcase;
    if (this.state.collection.showcases && this.state.collection.showcases.length > 0) {
      nextShowcase = (<PreviewLink showcase={this.state.collection.showcases[0]} />);
    }
    return (
      <mui.AppCanvas>
        <CollectionPageHeader collection={this.state.collection} >
          <div className="bee-page-title-bar"><h2 className="bee-page-title-bar-title">Introduction</h2></div>
        </CollectionPageHeader>
        <PageContent>
          <CollectionDescription collection={this.state.collection} />
        </PageContent>

        {nextShowcase}
        <CollectionPageFooter collection={this.state.collection} />
      </mui.AppCanvas>
    );
  }
});

module.exports = CollectionIntroduction;
