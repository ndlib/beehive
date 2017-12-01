import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

const MetadataHTML = createReactClass({
  displayName: 'Metadata HTML',

  propTypes: {
    metadataField: PropTypes.object.isRequired,
  },

  render: function () {
    return (<div dangerouslySetInnerHTML={{ __html: this.props.metadataField.value }} />)
  },
})

module.exports = MetadataHTML
