import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

const MetadataText = createReactClass({
  displayName: 'Metadata Text',

  propTypes: {
    metadataField: PropTypes.object.isRequired,
  },

  render: function () {
    return (<div>{this.props.metadataField.value}</div>)
  },
})

module.exports = MetadataText
