"use strict"
var AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
var ItemActionTypes = require("../constants/ItemActionTypes.jsx");
var EventEmitter = require("../middleware/EventEmitter.js");

class ItemActions {
  setCurrentItem(item) {
    AppDispatcher.dispatch({
      actionType: ItemActionTypes.ITEM_SET_ITEM,
      item: item
    });
  }

  showItemDialogWindow(item) {
    EventEmitter.emit("ItemDialogWindow", item);
  }

  hideItemDialogWindow() {
    EventEmitter.emit("HideItemDialogWindow", 'hide');
  }

}
module.exports = new ItemActions();
//export default ItemActions;
