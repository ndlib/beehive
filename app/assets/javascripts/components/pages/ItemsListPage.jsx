//app/assets/javascripts/components/ItemsListPage.jsx
var React = require('react');

var ItemsListPage = React.createClass({
  displayName: 'Items List Page',

  propTypes: {
    collection: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
      items: [],
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
      items: collection.items,
    });
  },

  render: function() {
    return (
    <div>
      <ItemsModalList items={this.state.items} />
      <Layout>
          <CollectionPageHeader collection={this.state.collection} />
          <PageContent>
            <ItemsList items={this.state.items} />
          </PageContent>
        </Layout>
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = ItemsListPage;
