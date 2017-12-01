const AppDispatcher = require('../dispatcher/AppDispatcher.jsx')
const StoreEventEmitter = require('../middleware/StoreEventEmitter.js')
const ActionTypes = require('../constants/ConfigurationActionTypes.jsx')

class ConfigurationStore extends StoreEventEmitter {
  constructor () {
    super()
    this._fields = {}
    this._sorts = {}
    this._facets = {}
    this._loaded = false
    this._enableSearch = false
    this._enableBrowse = false

    Object.defineProperty(this, 'fields', {
      get: function () { return this._fields },
    })

    AppDispatcher.register(this.receiveAction.bind(this))
  }

  // Receives actions sent by the AppDispatcher
  receiveAction (action) {
    switch (action.actionType) {
      case ActionTypes.LOAD_CONFIGURAION:
        this._loaded = true
        this._fields = action.configuration.fields
        this._sorts = action.configuration.sorts
        this._facets = action.configuration.facets
        this._enableSearch = action.configuration.enableSearch
        this._enableBrowse = action.configuration.enableBrowse
        this._hasAboutPage = action.configuration.hasAboutPage

        this.emitChange()
        break
      default:
        break
    }
  }

  loaded () {
    return this._loaded
  }

  searchEnabled () {
    return this._enableSearch
  }

  browseEnabled () {
    return this._enableBrowse
  }

  hasAboutPage () {
    return this._hasAboutPage
  }
}

module.exports = new ConfigurationStore()
