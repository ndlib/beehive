
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var MetadataHTML = createReactClass({
  displayName: 'Metadata HTML',

  propTypes: {
    metadata_field: PropTypes.object.isRequired,
  },

  render: function () {
    return (<div dangerouslySetInnerHTML={{ __html: this.props.metadata_field.value }} />)
  },
})

module.exports = MetadataHTML
