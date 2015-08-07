'use strict'
var React = require('react');

var ItemModal = React.createClass({
  displayName: 'Item Modal',
  propTypes: {
    item: React.PropTypes.object.isRequired,
    previousItem: React.PropTypes.string,
    nextItem: React.PropTypes.string,
    height: React.PropTypes.number.isRequired,
  },

  itemPage: function() {
    return (
       <ItemShow height={this.props.height} item={this.props.item} previousItem={this.props.previousItem} nextItem={this.props.nextItem} />
    );
  },

  modalID: function() {
    return "modal-" + this.props.item.id;
  },

  render: function () {
    var itemPage = this.itemPage();
    return (
      <Modal className="item-modal" height={this.props.height} id={this.modalID()} content={itemPage} hasHash={true} />
    );
  }
});

module.exports = ItemModal;
