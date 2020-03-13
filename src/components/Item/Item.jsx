import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import ItemShow from './ItemShow.jsx'
import CollectionPageHeader from '../../layout/CollectionPageHeader.jsx'
import PageContent from '../../layout/PageContent.jsx'
import CollectionPageFooter from '../../layout/CollectionPageFooter.jsx'
import ConfigurationActions from '../../actions/ConfigurationActions.js'
import ConfigurationStore from '../../store/ConfigurationStore.js'
import Loading from '../../other/Loading.jsx'
import PageTitle from '../../modules/PageTitle.js'
import BrowserUtils from '../../modules/BrowserUtils.jsx'
import LoadRemote from '../../modules/LoadRemote.jsx'
const showcaseTitleHeight = 56

const Item = createReactClass({
  propTypes: {
    collection: PropTypes.string,
    item: PropTypes.string,
  },

  getInitialState: function () {
    return {
      collection: null,
      item: null,
      height: window.innerHeight,
    }
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
  },

  collectionLoaded: function (collection) {
    ConfigurationActions.load(collection)
    this.setState({
      remoteCollectionLoaded: true,
      collection: collection,
    }, this.handleResize)
  },

  itemLoaded: function (result) {
    this.setState({
      remoteItemLoaded: true,
      item: result.items,
    })
  },

  componentWillMount: function () {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
    window.removeEventListener('resize', this.handleResize)
  },

  componentDidMount: function () {
    LoadRemote.withCallback(this.props.collection, this.collectionLoaded)
    LoadRemote.withCallback(this.props.item, this.itemLoaded)
    window.addEventListener('resize', this.handleResize, false)
    this.handleResize()
  },

  componentWillReceiveProps: function (nextProps) {
    let itemLoaded = this.state.remoteItemLoaded
    let collectionLoaded = this.state.remoteCollectionLoaded
    if (this.props.item !== nextProps.item) {
      LoadRemote.withCallback(nextProps.item, this.itemLoaded.bind(this))
      itemLoaded = false
    }

    if (this.props.collection !== nextProps.collection) {
      LoadRemote.withCallback(nextProps.collection, this.collectionLoaded.bind(this))
      collectionLoaded = false
    }

    this.setState({
      remoteItemLoaded: itemLoaded,
      remoteCollectionLoaded: collectionLoaded,
    })
  },

  handleResize: function () {
    this.setState({
      height: window.innerHeight,
    })
  },

  render: function () {
    if (!this.state.remoteCollectionLoaded || !this.state.remoteItemLoaded) {
      return null
    }
    PageTitle(this.state.item.name)
    let itemShow

    if (this.state.item) {
      itemShow = (
        <ItemShow
          collection={this.state.collection}
          item={this.state.item}
          height={this.state.mobile ? window.innerHeight : window.innerHeight - showcaseTitleHeight}
          title={this.state.item.name}
        />
      )
    } else {
      itemShow = (<Loading />)
    }
    let header
    if (!BrowserUtils.mobile()) {
      header = (<CollectionPageHeader collection={this.state.collection} />)
    }
    return (
      <div style={{ backgroundColor: 'inherit' }}>
        {header}
        <PageContent fluidLayout>
          {itemShow}
        </PageContent>
        <CollectionPageFooter />
      </div>
    )
  },
})

export default Item
