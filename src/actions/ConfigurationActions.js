import AppDispatcher from '../dispatcher/AppDispatcher'
import ActionTypes from '../constants/ConfigurationActionTypes'
import EventEmitterSingleton from '../middleware/EventEmitterSingleton'
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
        EventEmitterSingleton.emit('ConfigurationStoreQueryFailed', {
          request: request, status: status, error: thrownError,
        })
      },
    })
  }
}

export default new ConfigurationActions()
