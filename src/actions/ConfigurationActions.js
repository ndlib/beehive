import AppDispatcher from '../dispatcher/AppDispatcher.jsx'
import ActionTypes from '../constants/ConfigurationActionTypes.jsx'
import EventEmitter from '../middleware/EventEmitter.js'
const $ = require('jquery')

class ConfigurationActions {
  load (collection) {
    const configURL = collection['hasPart/metadataConfiguration']

    $.ajax({
      context: this,
      type: 'GET',
      url: configURL,
      dataType: 'json',
      success: function (result) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.LOAD_CONFIGURAION,
          configuration: result,
          collection: collection,
        })
      },
      error: function (request, status, thrownError) {
        EventEmitter.emit('ConfigurationStoreQueryFailed', {
          request: request, status: status, error: thrownError,
        })
      },
    })
  }
}

export default new ConfigurationActions()
