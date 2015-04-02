//app/assets/javascripts/components/ItemsList.jsx
var React = require('react');

var ItemsList = React.createClass({
  displayName: 'Items List',

  propTypes: {
    items: React.PropTypes.array,
  },

  componentDidUpdate: function() {
    if(window.location.hash) {
      $(window.location.hash).modal('show');
    }
  },

  render: function() {
    var itemNodes = this.props.items.map(function(item, index) {
      var nodes = [];
      if (index > 0) {
        if (index%3 == 0) {
          nodes.push ((
            <div className="clearfix"></div>
          ));
        }
      }
      nodes.push((
        <div  className="col-sm-4" key={item['@id']}>
          <ItemsListItem item={item} />
        </div>
      ));
      return nodes;
    });
    return (
      <div className="items-list">
        <div className="container">
          <div>{itemNodes}</div>
        </div>
      </div>
    );

  }
});

// each file will export exactly one component
module.exports = ItemsList;
