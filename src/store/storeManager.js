import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import promiseMiddleware from '../middleware/promiseMiddleware'
import myMiddleware from '../middleware/middleware'
import initialState from './initialState'

const createStoreWithMiddleware = applyMiddleware(
  myMiddleware,
  promiseMiddleware,
)(createStore)

export default function initStore () {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
