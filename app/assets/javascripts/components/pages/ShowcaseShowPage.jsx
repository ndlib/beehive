//app/assets/javascripts/components/ShowcaseShowPage.jsx
var React = require('react');

var ShowcaseShowPage = React.createClass({
  mixins: [PageHeightMixin],

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

  loadRemoteCollection: function() {
    $.get(this.props.collection, function(result) {
      this.setValues(result);
    }.bind(this));
  },

  setValues: function(collection) {
    this.setState({
      collection: collection,
      showcase: collection.showcases,
    }, this.handleResize);
  },

  modals: function() {
    if(this.state.showcase) {
      return (<SectionsModalList height={this.state.height} sections={this.state.showcase.sections} />);
    }
    else {
      return (<span />);
    }
  },

  componentDidMount: function() {
    if ('object' == typeof(this.props.collection)) {
      this.setValues(this.props.collection);
    } else {
      this.loadRemoteCollection()
    }
  },

  render: function() {
    return (
      <div>
        {this.modals()}
        <Layout>
          <CollectionPageHeader collection={this.state.collection} />
          <PageContent>
            <ShowcaseShow height={this.state.height} showcase={this.state.showcase} />
          </PageContent>
        </Layout>
        <CollectionOverlayFooter collection={this.state.collection} />
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseShowPage;
