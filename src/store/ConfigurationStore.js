var AppDispatcher = require("../dispatcher/AppDispatcher.jsx");
var StoreEventEmitter = require("../middleware/StoreEventEmitter.js");
var ActionTypes = require("../constants/ConfigurationActionTypes.jsx");

class ConfigurationStore extends StoreEventEmitter {
  constructor() {
    super();
    this._fields = {};
    this._sorts = {};
    this._facets = {};

    Object.defineProperty(this, "fields", {
      get: function() { return this._fields; }
    });

    AppDispatcher.register(this.receiveAction.bind(this));
  }

  // Receives actions sent by the AppDispatcher
  receiveAction(action) {
    switch(action.actionType) {
      case ActionTypes.LOAD_CONFIGURAION:
        this._fields = action.configuration.fields;
        this._sorts = action.configuration.sorts;
        this._facets = action.configuration.facets;
        this.emitChange();
        break;
    }
  }
}

module.exports = new ConfigurationStore();
