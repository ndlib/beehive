var AppDispatcher = require("../dispatcher/AppDispatcher");
var ItemActionTypes = require("../constants/ItemActionTypes");
var EventEmitter = require("../EventEmitter");

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
var ItemActions = new ItemActions();
module.exports = ItemActions;
