import React from 'react'
import createReactClass from 'create-react-class'
const Details = require('../display/Details.jsx')
const ConfigurationActions = require('../actions/ConfigurationActions.js')
const ConfigurationStore = require('../store/ConfigurationStore.js')
const LoadRemote = require('../modules/LoadRemote.jsx')
const CollectionUrl = require('../modules/CollectionUrl.jsx')

const PrintableMetadata = createReactClass({

  componentWillMount: function () {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
    LoadRemote.withCallback(CollectionUrl.remoteItem(this.props.match.params.itemID), this.setItem.bind(this))
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
  },

  setItem: function (result) {
    let item = result.items
    this.setState({
      item: item,
    })

    if (item['isPartOf/collection']) {
      const collectionUrl = item['isPartOf/collection']
      LoadRemote.loadRemoteCollection(collectionUrl, this.setValues.bind(this))
    } else {
      this.setState({ 'configurationLoaded': true })
    }
  },

  setValues: function (result) {
    ConfigurationActions.load(result)
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
  },

  render: function () {
    if (this.state.item && this.state.configurationLoaded) {
      return (
        <Details item={this.state.item} showDetails printable={false} />
      )
    } else {
      return (<div />)
    }
  },
})

export default PrintableMetadata
