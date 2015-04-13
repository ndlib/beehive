//app/assets/javascripts/components/ShowcaseShowPage.jsx
var React = require('react');

var maxShowcaseHeight = 840;
var showcaseTitleHeight = 40;

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
    });
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
    var showcaseHeight = this.state.height - showcaseTitleHeight;
    if (showcaseHeight > maxShowcaseHeight) {
      showcaseHeight = maxShowcaseHeight;
    }
    return (
      <div>
        <div id="blur" />
        {this.modals()}
        <Layout>
          <CollectionPageHeader collection={this.state.collection} />
          <PageContent>
            <ShowcaseTitleBar height={showcaseTitleHeight} showcase={this.state.showcase} />
            <ShowcaseShow height={showcaseHeight} showcase={this.state.showcase} />
          </PageContent>
        </Layout>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ShowcaseShowPage;
