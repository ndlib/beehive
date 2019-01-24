import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Divider } from 'material-ui'
import { Helmet } from 'react-helmet'
const MetadataString = require('./MetadataString.jsx')
const MetadataDate = require('./MetadataDate.jsx')
const MetadataHTML = require('./MetadataHTML.jsx')
const MetadataText = require('./MetadataText.jsx')

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

  metaTag: function () {
    // Add a meta tag to the <head> explicitly to help SEO with identifying text blurb to show users
    if (this.props.metadata.label.toLowerCase() === 'description') {
      let valArr = []
      this.props.metadata.values.map(function (metadataField) {
        valArr.push(metadataField.value)
      }, this)

      return (
        <Helmet>
          <meta name='description' content={valArr.join(' ')} />
        </Helmet>
      )
    }
    return null
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
        <Divider style={Styles.divider} inset={false} />
        <dd style={Styles.fieldValue}>{this.map_arrays_to_values()}</dd>
        {this.metaTag()}
      </dl>
    )
  },
})

module.exports = MetadataItem
