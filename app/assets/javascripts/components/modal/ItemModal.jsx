//app/assets/javascripts/components/modal/ItemModal.jsx
var React = require('react');

var ItemModal = React.createClass({
  displayName: 'Item Modal',
  propTypes: {
    item: React.PropTypes.object.isRequired,
    previousItem: React.PropTypes.string,
    nextItem: React.PropTypes.string,
  },

  itemPage: function() {
    return (
       <ItemShow item={this.props.item} previousItem={this.props.previousItem} nextItem={this.props.nextItem} />
    );
  },

  modalID: function() {
    return "modal-" + this.props.item.id;
  },

  render: function () {
    var itemPage = this.itemPage();
    return (
      <Modal id={this.modalID()} content={itemPage} />
    );
  }
});

module.exports = ItemModal;
