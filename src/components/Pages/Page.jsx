import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import JSONLD from '../JSONLD.jsx'
import RemoveMarkup from '../../modules/RemoveMarkup'
const CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
const PageContent = require('../../layout/PageContent.jsx')
const CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
const PagesShow = require('./PagesShow.jsx')
const PageTitleBar = require('./PageTitleBar.jsx')
const SitePathCard = require('../Collection/SitePathCard.jsx')
const PreviewLink = require('../../layout/PreviewLink.jsx')
const MediaQuery = require('react-responsive')
const ConfigurationActions = require('../../actions/ConfigurationActions.js')
const ConfigurationStore = require('../../store/ConfigurationStore.js')
const PageTitle = require('../../modules/PageTitle.js')
const LoadRemote = require('../../modules/LoadRemote.jsx')

const Page = createReactClass({
  propTypes: {
    collection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  },

  getInitialState: function () {
    return {
      titleHeight: 56,
      titleSectionPercentVisible: 0,
      collection: {},
      remoteCollectionLoaded: false,
    }
  },

  componentDidMount: function () {
    ConfigurationStore.addChangeListener(this.configurationLoaded)
    if (typeof (this.props.collection) === 'object') {
      this.setState({
        collection: this.props.collection,
      })
    } else {
      LoadRemote.loadRemoteCollection(this.props.collection, this.setValues)
    }
  },

  componentWillUnmount: function () {
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

  // Callback from loadRemoteCollection
  setValues: function (result) {
    ConfigurationActions.load(result)
    if (result.pages.items) {
      this.linkItems(result.pages.items)
    }
    this.setState({
      remoteCollectionLoaded: true,
      collection: result,
    })
    return true
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
  },

  // Creates doubly linked list from items to make subsequent
  // item navigation operations easier/faster
  linkItems: function (items) {
    items.forEach(function (item, i, array) {
      const nextI = i + 1
      const prevI = i - 1
      if (nextI < array.length) {
        item.nextItem = array[nextI]
      }
      if (prevI >= 0) {
        item.previousItem = array[prevI]
      }
    })
  },

  contentMouseOver: function (event) {
    const item = this.getItemFromEvent(event)
    if (item) {
      event.target.style.cursor = 'pointer'
    }
  },

  getItemFromEvent: function (event) {
    let item
    const itemId = event.target.getAttribute('item_id')
    if (itemId && this.state.collection.pages.items) {
      item = this.state.collection.pages.items.find(function (e, i, a) {
        return e['id'] === itemId
      })
    }
    return item
  },

  nextCard: function () {
    let nextCard = null
    if (this.state.collection.pages.nextObject) {
      nextCard = [
        <div style={{ clear: 'both' }} key='next'>
          <hr />
          <MediaQuery minWidth={1001} key='min-w'>
            <div style={{ margin: '0 auto', maxWidth: '500px' }}>
              <SitePathCard
                headerTitle='Continue to'
                siteObject={this.state.collection.pages.nextObject}
                addNextButton
                fixedSize={false}
              />
            </div>
          </MediaQuery>,
          <MediaQuery maxWidth={1000} key='max-w'>
            <div style={{ margin: '0 0', maxWidth: '500px' }}>
              <SitePathCard
                headerTitle='Continue to'
                siteObject={this.state.collection.pages.nextObject}
                addNextButton
                fixedSize={false}
              />
            </div>
          </MediaQuery>
        </div>,
      ]
    }
    return nextCard
  },

  previewCard: function () {
    if (this.state.collection.pages.nextObject) {
      return (
        <PreviewLink
          siteObject={this.state.collection.pages.nextObject}
          key='prev'
        />
      )
    }
    return null
  },

  pageContent: function () {
    if (this.state.collection && this.state.collection.pages) {
      return (this.state.collection.pages.content)
    } else {
      return (<div />)
    }
  },

  render: function () {
    if (!this.state.remoteCollectionLoaded) {
      return null
    }
    const collection = this.state.collection
    PageTitle(collection.name)

    let image = ''
    if (collection.pages.image && collection.pages.image.contentUrl) {
      image = collection.pages.image.contentUrl
    }

    const dataUrl = `https://collections.library.nd.edu/${collection.id}/${collection.slug}/${collection.pages.id}/${collection.pages.slug}`
    const data = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': dataUrl,
      },
      'headline': `About ${collection.pages.name}`,
      'image': image,
      'genre': 'academic library collection',
      'keywords': 'notre dame special collections digital exhibits library',
      'author': {
        '@type': 'Organization',
        'name': 'Hesburgh Library - University of Notre Dame',
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'University of Notre Dame',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://onmessage.nd.edu/assets/185044/fullsize/1_university_mark.jpg',
        },
      },
      'url': dataUrl,
      'datePublished': collection.pages.last_updated,
      'dateModified': collection.pages.last_updated,
      'description': RemoveMarkup(this.pageContent()),
      'articleBody': RemoveMarkup(this.pageContent()),
    }
    return (
      <div>
        <CollectionPageHeader collection={collection} branding={false} />
        <PageTitleBar title={collection.pages.name} height={this.state.titleHeight} />
        <PageContent onClick={this.contentClicked} onMouseOver={this.contentMouseOver}>
          <PagesShow content={this.pageContent()}>
            { this.nextCard() }
            { this.previewCard() }
          </PagesShow>
        </PageContent>
        <CollectionPageFooter collection={collection} />
        <JSONLD data={data} />
      </div>
    )
  },
})

module.exports = Page
