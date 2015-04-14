//app/assets/javascripts/components/ShowcaseShowPage.jsx
var React = require('react');

var maxShowcaseHeight = 840;
var minHeight = 160;
var showcaseTitleHeight = 40;

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
      height: this.getHeight(),
    };
  },

  getHeight: function() {
    var top = ($('#banner').outerHeight() || 0);
    var footerHeight = ($('#footer').outerHeight() || 0);
    var height = $(window).height() - top - footerHeight;
    if (height < minHeight) {
      height = minHeight;
    }
    return height;
  },

  handleResize: function() {
    this.setState({
      height: this.getHeight(),
    });
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
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  render: function() {
    var showcaseHeight = this.state.height - showcaseTitleHeight;
    if (showcaseHeight > maxShowcaseHeight) {
      showcaseHeight = maxShowcaseHeight;
    }
    return (
      <div>
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
