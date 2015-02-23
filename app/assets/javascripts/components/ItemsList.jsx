//app/assets/javascripts/components/ItemsList.jsx
var React = require('react');

var ItemsList = React.createClass({
  displayName: 'Items List',

  propTypes: {
    itemsUrl: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      items: [],
    };
  },
  componentDidMount: function() {
    console.log('set state');
    $.get(this.props.itemsUrl, function(result) {
      this.setState({
        items: result.showcases.items,
      })
    }.bind(this));
  },
  render: function() {
  console.log(this.state);
    if(this.state.items) {
      var itemNodes = this.state.items.map(function(item, index) {
        var nodes = [];
        nodes.push((
          <div>
            <ItemsListItem item={item} />
          </div>
        ));
        return nodes;
      });
      return (
        <div>
          <h2>Item List</h2>
          <div>{itemNodes}</div>
        </div>
      );
    } else {
      return <div>LOADING</div>;
    }
  }
});

// each file will export exactly one component
module.exports = ItemsList;
