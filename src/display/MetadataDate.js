import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

const MetadataDate = createReactClass({
  displayName: 'Metadata Date',

  propTypes: {
    metadataField: PropTypes.object.isRequired,
  },

  render: function () {
    return (<time dateTime={this.props.metadataField.iso8601}>{this.props.metadataField.value}</time>)
  },
})

export default MetadataDate
