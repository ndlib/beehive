import React from 'react'
import createReactClass from 'create-react-class'
import { CircularProgress } from '@material-ui/core'

const Loading = createReactClass({

  render: function () {
    return (<CircularProgress mode='indeterminate' size={0.5} />)
  },

})

export default Loading
