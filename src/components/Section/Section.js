import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import SectionShow from './SectionShow'
import CollectionPageHeader from '../../layout/CollectionPageHeader'
import PageContent from '../../layout/PageContent'
import CollectionPageFooter from '../../layout/CollectionPageFooter'
import ConfigurationActions from '../../actions/ConfigurationActions'
import ConfigurationStore from '../../store/ConfigurationStore'
import Loading from '../../other/Loading'
import PageTitle from '../../modules/PageTitle'
import BrowserUtils from '../../modules/BrowserUtils'
import LoadRemote from '../../modules/LoadRemote'
const showcaseTitleHeight = 56

const Section = createReactClass({
  propTypes: {
    collection: PropTypes.string,
    section: PropTypes.string,
  },

  getInitialState: function () {
    return {
      collection: null,
      section: null,
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

  sectionLoaded: function (result) {
    this.setState({
      remoteSectionLoaded: true,
      section: result.showcases.sections,
    })
  },

  componentWillMount: function () {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
  },

  componentDidMount: function () {
    LoadRemote.withCallback(this.props.collection, this.collectionLoaded)
    LoadRemote.withCallback(this.props.section, this.sectionLoaded)
    window.addEventListener('resize', this.handleResize, false)
    this.handleResize()
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
  },

  componentWillReceiveProps: function (nextProps) {
    let sectionLoaded = this.state.remoteSectionLoaded
    let collectionLoaded = this.state.remoteCollectionLoaded
    if (this.props.section !== nextProps.section) {
      LoadRemote.withCallback(nextProps.section, this.sectionLoaded)
      sectionLoaded = false
    }

    if (this.props.collection !== nextProps.collection) {
      LoadRemote.withCallback(nextProps.collection, this.collectionLoaded)
      collectionLoaded = false
    }

    this.setState({
      remoteSectionLoaded: sectionLoaded,
      remoteCollectionLoaded: collectionLoaded,
    })
  },

  handleResize: function () {
    this.setState({
      height: this.state.mobile ? window.innerHeight : window.innerHeight - showcaseTitleHeight,
    })
  },

  render: function () {
    if (!this.state.remoteCollectionLoaded || !this.state.remoteSectionLoaded) {
      return null
    }
    PageTitle(this.state.section.name)
    let sectionShow

    if (this.state.section) {
      sectionShow = (
        <SectionShow
          section={this.state.section}
          height={this.state.mobile ? window.innerHeight : window.innerHeight - showcaseTitleHeight}
          previousSection={this.state.section.previousSection}
          nextSection={this.state.section.nextSection}
          collection={this.state.collection}
        />
      )
    } else {
      sectionShow = (<Loading />)
    }
    let header
    if (!BrowserUtils.mobile()) {
      header = (<CollectionPageHeader collection={this.state.collection} />)
    }
    return (
      <div style={{ backgroundColor: 'inherit' }}>
        {header}
        <PageContent fluidLayout>
          {sectionShow}
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    )
  },
})

export default Section
