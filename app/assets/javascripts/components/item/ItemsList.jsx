//app/assets/javascripts/components/ItemsList.jsx
var React = require('react');

var ItemsList = React.createClass({
  displayName: 'Items List',

  propTypes: {
    items: React.PropTypes.array,
    height: React.PropTypes.number.isRequired,
  },

  componentDidUpdate: function() {
    this.checkHash();
  },

  componentDidMount: function() {
    window.addEventListener("hashchange", this.checkHash, false);
    this.checkHash();
  },

  checkHash: function() {
    $(".modal").modal("hide");
    if(window.location.hash) {
      $(window.location.hash).modal('show');
    }
  },

  outerStyle: function() {
    return {
      width: '100%',
    };
  },


  render: function() {
    var itemNodes = this.props.items.map(function(item, index) {
      var nodes = [];
      nodes.push((
        <div key={item['@id']} className="item-block">
          <ItemsListItem item={item} />
        </div>
      ));
      return nodes;
    });
    return (
      <div className="items-list" style={this.outerStyle()}>
        <div className="container flow-columns">
          {itemNodes}
        </div>
      </div>
    );

  }
});

// each file will export exactly one component
module.exports = ItemsList;
