//app/assets/javascripts/components/ItemShowPage.jsx
var React = require('react');

var ItemShowPage = React.createClass({
  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
      item: null,
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
      item: collection.items,
    });
  },

  render: function() {
    return (
      <Layout>
        <CollectionPageHeader collection={this.state.collection} />
        <PageContent>
          <ItemShow item={this.state.item} />
        </PageContent>
      </Layout>
    );
  }
});

// each file will export exactly one component
module.exports = ItemShowPage;
