import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { CircularProgress } from 'material-ui'

var Loading = createReactClass({

  render: function () {
    return (<CircularProgress mode='indeterminate' size={0.5} />)
  },

})

// each file will export exactly one component
module.exports = Loading
