import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import JSONLD from '../JSONLD.jsx'
import RemoveMarkup from '../../modules/RemoveMarkup'
const CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
const PageContent = require('../../layout/PageContent.jsx')
const CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
const PagesShow = require('../Pages/PagesShow.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')
const PageTitle = require('../../modules/PageTitle.js')

const About = createReactClass({
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

  render: function () {
    const collection = this.state.collection
    if (!this.state.remoteCollectionLoaded) {
      return null
    }
    PageTitle(collection.name_line_1 + ' - About')

    let pageContent = null
    if (collection && collection.about) {
      pageContent = (
        <PagesShow title='About' content={collection.about} />
      )
    }

    const dataUrl = `https://collections.library.nd.edu/${collection.id}/${collection.slug}/about`
    const data = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': dataUrl,
      },
      'headline': `About ${collection.name_line_1}`,
      'alternativeHeadline': 'About',
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
      'datePublished': collection.last_updated,
      'dateModified': collection.last_updated,
      'description': RemoveMarkup(collection.about),
      'articleBody': RemoveMarkup(collection.about),
    }

    return (
      <div>
        <CollectionPageHeader collection={collection} branding />
        <PageContent>
          {pageContent}
        </PageContent>
        <CollectionPageFooter collection={collection} />
        <JSONLD data={data} />
      </div>
    )
  },
})

module.exports = About
