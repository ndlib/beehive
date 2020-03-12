import { isFSA } from 'flux-standard-action'
const uuidv4 = require('uuid/v4')

function isPromise (val) {
  return val && typeof val.then === 'function'
}

export default function promiseMiddleware ({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action)
    }

    if (isPromise(action.payload)) {
      const sequenceId = uuidv4()

      dispatch({
        ...action,
        payload: undefined,
        sequence: {
          type: 'start',
          id: sequenceId,
        },
      })

      return action.payload.then(
        result => dispatch({
          ...action,
          payload: result,
          sequence: {
            type: 'next',
            id: sequenceId,
          },
        }),
        error => dispatch({
          ...action,
          payload: error,
          error: true,
          sequence: {
            type: 'next',
            id: sequenceId,
          },
        })
      )
    }

    return next(action)
  }
}
