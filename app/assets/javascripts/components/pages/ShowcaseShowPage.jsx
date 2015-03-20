//app/assets/javascripts/components/ShowcaseShowPage.jsx
var React = require('react');

var ShowcaseShowPage = React.createClass({
  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
      showcase: null,
    };
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection()
    }
  },

  loadRemoteCollection: function() {
    $.get(this.props.collection, function(result) {
      this.setValues(result);
    }.bind(this));
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
      showcase: collection.showcases,
    });
  },
  modals: function() {
    if(this.state.showcase) {
      return (<SectionsModalList sections={this.state.showcase.sections} />);
    }
    else {
      return (<span />);
    }
  },
  render: function() {
    return (
      <div>
        {this.modals()}
        <Layout>
          <CollectionPageHeader collection={this.state.collection} />
          <PageContent>
            <ShowcaseShow showcase={this.state.showcase} />
          </PageContent>
        </Layout>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseShowPage;
