
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var MetadataText = createReactClass({
  displayName: 'Metadata Text',

  propTypes: {
    metadata_field: PropTypes.object.isRequired,
  },

  render: function () {
    return (<div>{this.props.metadata_field.value}</div>)
  },
})

module.exports = MetadataText
