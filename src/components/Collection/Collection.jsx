import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import JSONLD from '../JSONLD.jsx'
import RemoveMarkup from '../../modules/RemoveMarkup'
const CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
const CollectionShow = require('./CollectionShow.jsx')
const PageContent = require('../../layout/PageContent.jsx')
const CollectionIntro = require('./CollectionIntro.jsx')
const CollectionShowSitePath = require('./CollectionShowSitePath.jsx')
const CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
const PageTitle = require('../../modules/PageTitle.js')

const LoadRemote = require('../../modules/LoadRemote.jsx')

const Collection = createReactClass({
  propTypes: {
    collection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  },

  getInitialState: function () {
    return {
      collection: {},
      remoteCollectionLoaded: false,
    }
  },

  componentDidMount: function () {
    if (typeof (this.props.collection) === 'object') {
      this.setState({
        collection: this.props.collection,
      })
    } else {
      LoadRemote.loadRemoteCollection(this.props.collection, this.onLoaded)
    }
  },

  onLoaded: function (result) {
    this.setState({
      remoteCollectionLoaded: true,
      collection: result,
    })
  },

  componentWillMount: function () {
    document.body.className = document.body.className + ' collection'
  },

  style: function () {
    return ({
      marginTop:'-64px',
    })
  },

  render: function () {
    const collection = this.state.collection
    if (!this.state.remoteCollectionLoaded) {
      return null
    }
    PageTitle(collection.name)

    const data = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      'url': `https://collections.library.nd.edu/${collection.id}/${collection.slug}`,
      'name': collection.name,
      'author': {
        '@type': 'Organization',
        'name': 'Hesburgh Library - University of Notre Dame',
      },
      'description': RemoveMarkup(collection.short_description),
      'publisher': {
        '@type': 'Organization',
        'name': 'University of Notre Dame',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://onmessage.nd.edu/assets/185044/fullsize/1_university_mark.jpg',
        },
      },
    }
    return (
      <div>
        <div className='collection-show-page'>
          <CollectionPageHeader collection={collection} branding />
          <CollectionShow collection={collection} />
          <PageContent fluidLayout={false}>
            <CollectionIntro collection={collection} />
            <CollectionShowSitePath collection={collection} />
          </PageContent>
          <CollectionPageFooter collection={collection} />
          <JSONLD data={data} />
        </div>
      </div>
    )
  },
})

module.exports = Collection
