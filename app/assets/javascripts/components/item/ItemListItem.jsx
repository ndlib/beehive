'use strict'
var React = require('react');
var ItemActions = require('../../actions/ItemActions');
var ItemActionTypes = require('../../constants/ItemActionTypes');

var ItemListItem = React.createClass({
  mixins: [LoadRemoteMixin],
  propTypes: {
    item: React.PropTypes.object.isRequired,
    view: React.PropTypes.string,
  },

  onClick: function() {
    // check if item is in store else load it
    //EVENT EMITTER SAVE ITEM TO STORE
    var item = this.loadRemoteItem(this.props.item['@id']);
    ItemActions.setCurrentItem(item);
    ItemActions.showItemDialogWindow(item);
    //window.location.hash = 'modal-' + this.props.item.id;
  },

  targetID: function() {
    return '#modal-' + this.props.item.id;
  },

  columnClass: function() {
    if(this.props.view === 'list') {
      return 'col-lg-12';
    }
    else {
      return 'col-lg-3 col-md-4 col-sm-6';
    }
  },

  render: function() {
    return (
      <div className={this.columnClass()}>
        <div key={this.props.item['@id']} className='bee-item'>
          <a href={this.targetID()} data-toggle='modal' data-target={this.targetID()} onClick={this.onClick}>
            <ItemImage image={this.props.item.image} />
            <ItemText item={this.props.item} />
          </a>
        </div>
      </div>
    );
  }
});

// each file will export exactly one component
module.exports = ItemListItem;
