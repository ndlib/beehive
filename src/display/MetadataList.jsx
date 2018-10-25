import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { FontIcon } from 'material-ui'
const MetadataItem = require('./MetadataItem.jsx')
const ConfigurationStore = require('../store/ConfigurationStore.js')

const MetadataList = createReactClass({
  propTypes: {
    metadata: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    printable: PropTypes.bool,
  },

  getDefaultProps: function () {
    return {
      printable: true,
    }
  },

  componentWillMount: function () {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
  },

  orderByConfiguration: function (keys) {
    return keys.sort(function (key1, key2) {
      const field1 = ConfigurationStore.fields[key1]
      const field2 = ConfigurationStore.fields[key2]
      if (field1 && field2) {
        return field1.order - field2.order
      }
      // When field1 and field2 are not defined in the config, leave order unchanged
      return 0
    })
  },

  // Filters out any keys that should not be displayed
  filteredMetaKeys: function (keys) {
    return keys.filter(function (key) {
      return key !== 'user_defined_id'
    })
  },

  metadataNodes: function () {
    let keys = Object.keys(this.props.metadata)
    keys = this.filteredMetaKeys(keys)
    keys = this.orderByConfiguration(keys)
    return keys.map(function (key) {
      return (<MetadataItem key={key} metadata={this.props.metadata[key]} />)
    }.bind(this))
  },

  printable: function () {
    if (this.props.printable) {
      const url = '/metadata/' + this.props.id
      return (
        <a href={url} target='_blank' rel='nofollow'>
          <FontIcon className='material-icons'>print</FontIcon>Printer Friendly View
        </a>
      )
    } else {
      return (<div />)
    }
  },

  render: function () {
    return (
      <div className='metadata-list'>
        <h3>Metadata</h3>
        <br />
        <div style={{ marginLeft: '40px' }}>
          { this.metadataNodes() }
        </div>
        { this.printable() }
      </div>
    )
  },
})

module.exports = MetadataList
