//app/assets/javascripts/components/ItemsModalList.jsx
var React = require('react');

var ItemsModalList = React.createClass({
  displayName: 'Items Modals',

  propTypes: {
    items: React.PropTypes.array.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  render: function() {
    if(this.props.items) {
      var modalNodeIDs = this.props.items.map(function(item, index) {
        return item.id;
      });
      var modalNodes = this.props.items.map(function(item, index) {
        var nodes = [];
        var previousNode = modalNodeIDs[index - 1];
        var nextNode = modalNodeIDs[index + 1];
        nodes.push((
          <ItemModal height={this.props.height} item={item} previousItem={previousNode} nextItem={nextNode} />
        ));
        return nodes;
      }.bind(this));

      return (
        <div id="items-modals" className="items-modals">
          {modalNodes}
        </div>
      );
    } else {
      return (<Loading />);
    }
  }
});

// each file will export exactly one component
module.exports = ItemsModalList;
