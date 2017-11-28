
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, { Divider } from 'material-ui'

var MetadataString = require('./MetadataString.jsx')
var MetadataDate = require('./MetadataDate.jsx')
var MetadataHTML = require('./MetadataHTML.jsx')
var MetadataText = require('./MetadataText.jsx')

var fieldTypeMap = {
  MetadataString: MetadataString,
  MetadataDate: MetadataDate,
  MetadataHTML: MetadataHTML,
  MetadataText: MetadataText,
}

var Styles = {
  fieldName: {
    fontSize: '14pt',
  },
  fieldValue: {

  },
  divider: {
    marginTop: '3px',
    marginBottom: '8px',
  },
}

var MetadataItem = createReactClass({
  displayName: 'Metadata Item',

  propTypes: {
    metadata: PropTypes.object.isRequired,
  },

  value: function (metadata_field, index) {
    var MetadataComponent = fieldTypeMap[metadata_field['@type']]
    return (<MetadataComponent key={index} metadata_field={metadata_field} />)
  },

  map_arrays_to_values: function () {
    return this.props.metadata.values.map(function (metadata_field, index) {
      return this.value(metadata_field, index)
    }, this)
  },

  render: function () {
    return (
      <dl>
        <dt style={Styles.fieldName}>{this.props.metadata.label.toUpperCase()}</dt>
        <Divider style={Styles.divider} inset={false} />
        <dd style={Styles.fieldValue}>{this.map_arrays_to_values()}</dd>
      </dl>
    )
  },
})

module.exports = MetadataItem
