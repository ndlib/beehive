import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import ShowcaseShow from './ShowcaseShow.jsx'
import CollectionPageHeader from '../../layout/CollectionPageHeader'
import PageContent from '../../layout/PageContent.jsx'
import CollectionPageFooter from '../../layout/CollectionPageFooter.jsx'
import ConfigurationActions from '../../actions/ConfigurationActions.js'
import ConfigurationStore from '../../store/ConfigurationStore.js'
import Loading from '../../other/Loading.jsx'
import PageTitle from '../../modules/PageTitle.js'
import BrowserUtils from '../../modules/BrowserUtils.jsx'
import LoadRemote from '../../modules/LoadRemote.jsx'

const Showcase = createReactClass({
  propTypes: {
    collection: PropTypes.any,
  },

  getInitialState: function () {
    return {
      showcase: null,
      height: window.innerHeight,
      widht: window.innerWidth,
    }
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
  },

  setValues: function (collection) {
    ConfigurationActions.load(collection)
    this.setState({
      remoteCollectionLoaded: true,
      collection: collection,
      showcase: collection.showcases,
    }, this.handleResize)
    return true
  },

  componentDidMount: function () {
    if (typeof (this.props.collection) === 'object') {
      this.setValues(this.props.collection)
    } else {
      LoadRemote.loadRemoteCollection(this.props.collection, this.setValues)
    }
    window.addEventListener('resize', this.handleResize, false)
    this.handleResize()
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize)
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.collection !== nextProps.collection) {
      if (typeof (nextProps.collection) === 'object') {
        this.setValues(nextProps.collection)
      } else {
        LoadRemote.loadRemoteCollection(nextProps.collection, this.setValues)
      }
    }
  },

  componentDidUpdate: function (prevProps) {
    if (this.props !== prevProps) {
      this.handleResize()
    }
  },

  handleResize: function () {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  },

  render: function () {
    if (!this.state.remoteCollectionLoaded) {
      return null
    }
    PageTitle(this.state.showcase.name)
    let showcaseShow
    if (this.state.showcase) {
      showcaseShow = (
        <ShowcaseShow collection={this.state.collection} showcase={this.state.showcase} />
      )
    } else {
      showcaseShow = (<Loading />)
    }
    let header
    if (!BrowserUtils.mobile()) {
      header = (<CollectionPageHeader collection={this.state.collection} />)
    }
    return (
      <div style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
        {header}
        <PageContent fluidLayout>
          {showcaseShow}
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    )
  },
})

export default Showcase
