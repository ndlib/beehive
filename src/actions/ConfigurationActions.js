"use strict"
import AppDispatcher from "../dispatcher/AppDispatcher.jsx"
import ActionTypes from "../constants/ConfigurationActionTypes.jsx"
import EventEmitter from "../middleware/EventEmitter.js"

class ConfigurationActions {

  load(collection) {
    var configURL = collection["hasPart/metadataConfiguration"]

    $.ajax({
      context: this,
      type: "GET",
      url: configURL,
      dataType: "json",
      success: function(result) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.LOAD_CONFIGURAION,
          configuration: result,
          collection: collection,
        })
      },
      error: function(request, status, thrownError) {
        EventEmitter.emit("ConfigurationStoreQueryFailed", {
          request: request, status: status, error: thrownError
        })
      }
    })
  }
}

module.exports = new ConfigurationActions()
