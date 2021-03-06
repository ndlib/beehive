import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Divider } from '@material-ui/core'
import MetadataString from './MetadataString'
import MetadataDate from './MetadataDate'
import MetadataHTML from './MetadataHTML'
import MetadataText from './MetadataText'

const fieldTypeMap = {
  MetadataString: MetadataString,
  MetadataDate: MetadataDate,
  MetadataHTML: MetadataHTML,
  MetadataText: MetadataText,
}

const Styles = {
  fieldName: {
    fontSize: '14pt',
  },
  fieldValue: {},
  divider: {
    marginTop: '3px',
    marginBottom: '8px',
  },
}

const MetadataItem = createReactClass({
  displayName: 'Metadata Item',
  propTypes: {
    metadata: PropTypes.object.isRequired,
  },

  value: function (metadataField, index) {
    const MetadataComponent = fieldTypeMap[metadataField['@type']]
    return (<MetadataComponent key={index} metadataField={metadataField} />)
  },

  map_arrays_to_values: function () {
    return this.props.metadata.values.map(function (metadataField, index) {
      return this.value(metadataField, index)
    }, this)
  },

  render: function () {
    return (
      <dl>
        <dt style={Styles.fieldName}>{this.props.metadata.label.toUpperCase()}</dt>
        <Divider style={Styles.divider} />
        <dd style={Styles.fieldValue}>{this.map_arrays_to_values()}</dd>
      </dl>
    )
  },
})

export default MetadataItem
