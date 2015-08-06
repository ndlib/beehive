var AppDispatcher = require("../dispatcher/AppDispatcher");
var EventEmitter = require("events").EventEmitter;
var ItemActionTypes = require("../constants/ItemActionTypes");

class ItemStore extends EventEmitter {
  constructor() {
    this.title = "";
    this.preview = false;
    this.published = false;
    this.openChanges = [];

    AppDispatcher.register(this.receiveAction.bind(this));
  }

  // Receives actions sent by the AppDispatcher
  receiveAction(action) {
    switch(action.actionType) {
      case ItemActionTypes.ITEM_SET_ITEM:
        break;
      default:
        break;
    }
  }

  emitChange(changeEvent) {
    this.emit(changeEvent);
  }

  addChangeListener(changeEvent, callback) {
    this.on(changeEvent, callback);
  }

  removeChangeListener(changeEvent, callback) {
    this.removeListener(changeEvent, callback);
  }

  // Changes a property to a given value and adds it to
  // the open change list
  setProps(Item) {
    this.preview = Item.preview;
    this.published = Item.published;
    this.title = Item.title;
    this.emitChange("ItemStoreChanged");
  }

  // Changes a property to a given value and adds it to
  // the open change list
  change(property, value) {
    // What to do if this property is already on the open change list?
    // We currently are not likely to have this problem, but this will
    // need to be expanded to handle that if we ever do
    this.openChanges[property] = { "previous": this[property], "new": value };
    this[property] = value;
    this.emitChange("ItemStoreChanged");
  }

  // Saves the changes made to a property by removing it
  // from the open change list
  save(property) {
    delete this.openChanges[property];
  }

  // Reverts the last change for the given property
  revert(property) {
    if(this.openChanges[property]) {
      this[property] = this.openChanges[property].previous;
      delete this.openChanges[property];
      this.emitChange("ItemStoreChanged");
    }
  }
}

var ItemStore = new ItemStore();
module.exports = ItemStore;
