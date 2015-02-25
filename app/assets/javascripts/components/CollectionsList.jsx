//app/assets/javascripts/components/CollectionsList.jsx
var React = require('react');

var CollectionsList = React.createClass({
  displayName: 'Collections List',

  propTypes: {
    collectionsUrl: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      collections: [],
    };
  },

  componentDidMount: function() {
    $.get(this.props.collectionsUrl, function(result) {
      this.setState({
        collections: result,
      })
    }.bind(this));
  },


  render: function() {

    var collectionNodes = this.state.collections.map(function(collection, index) {
      var nodes = [];
      if (index > 0) {
        if (index%3 == 0) {
          nodes.push ((
            <div className="clearfix"></div>
          ));
        }
      }
      nodes.push((
        <div className="col-sm-4" key={collection['@id']}>
          <CollectionsListItem collection={collection} />
        </div>
      ));
      return nodes;
    });
    return (
      <div className="collections-list">
        <div className="container">
          <div className="row">
            {collectionNodes}
          </div>
        </div>
      </div>
    );
  }

});

// each file will export exactly one component
module.exports = CollectionsList;
