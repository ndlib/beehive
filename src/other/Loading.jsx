import React from 'react'
import createReactClass from 'create-react-class'
import { CircularProgress } from 'material-ui'

var Loading = createReactClass({

  render: function () {
    return (<CircularProgress mode='indeterminate' size={0.5} />)
  },

})

module.exports = Loading
