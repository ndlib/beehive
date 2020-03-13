const EventEmitter = require('events')

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

export default StoreEventEmitter
