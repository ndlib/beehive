import React from 'react'
import createReactClass from 'create-react-class'
import { Helmet } from 'react-helmet'
const Details = require('../display/Details.jsx')
const ConfigurationActions = require('../actions/ConfigurationActions.js')
const ConfigurationStore = require('../store/ConfigurationStore.js')
const LoadRemote = require('../modules/LoadRemote.jsx')
const CollectionUrl = require('../modules/CollectionUrl.jsx')

const PrintableMetadata = createReactClass({
  getInitialState: function () {
    return {
      item: null,
      configurationLoaded: false,
    }
  },

  componentWillMount: function () {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
    LoadRemote.withCallback(CollectionUrl.remoteItem(this.props.match.params.itemID), this.setItem)
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
  },

  setItem: function (result) {
    const item = result.items
    this.setState({
      item: item,
    })

    if (item['isPartOf/collection']) {
      const collectionUrl = item['isPartOf/collection']
      LoadRemote.loadRemoteCollection(collectionUrl, this.setValues)
    } else {
      this.setState({ configurationLoaded: true })
    }
  },

  setValues: function (result) {
    this.setState({
      collection: result,
    })
    ConfigurationActions.load(result)
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
  },

  render: function () {
    if (this.state.item && this.state.configurationLoaded) {
      const url = `${window.location.origin}/${this.state.collection.id}/${this.state.collection.slug}/items/${this.state.item.id}`
      return (
        <div>
          <Helmet>
            <link rel='canonical' href={url} />
          </Helmet>
          <Details item={this.state.item} showDetails printable={false} />
        </div>
      )
    } else {
      return (<div />)
    }
  },
})

export default PrintableMetadata
