const EventEmitter = require('events').EventEmitter

// Defines a basic "StoreChanged" type of event that listeners
// can subscribe to through helper methods.
class StoreEventEmitter extends EventEmitter {
  addChangeListener (callback) {
    this.on('StoreChanged', callback)
  }

  removeChangeListener (callback) {
    this.removeListener('StoreChanged', callback)
  }

  emitChange () {
    this.emit('StoreChanged')
  }
}

module.exports = StoreEventEmitter
