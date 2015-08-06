var AppDispatcher = require("../dispatcher/AppDispatcher");
var ItemActionTypes = require("../constants/ItemActionTypes");
var EventEmitter = require("../EventEmitter");

class ItemActions {
  setCurrentItem(item) {
    console.log("SET ITEM");
    AppDispatcher.dispatch({
      actionType: ItemActionTypes.ITEM_SET_ITEM,
      item: item
    });
  }

  showItemDialogWindow(item) {
    console.log("SHOW WINDOW");
    EventEmitter.emit("ItemDialogWindow", item);
  }

  hideItemDialogWindow() {
    console.log("HIDE WINDOW");
    EventEmitter.emit("ItemDialogWindow", 'hide');
  }

}
var ItemActions = new ItemActions()
module.exports = ItemActions;
