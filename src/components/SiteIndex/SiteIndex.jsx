import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import JSONLD from '../JSONLD.jsx'
import SiteIndexHeader from './SiteIndexHeader.jsx'
import BrandBar from '../../layout/BrandBar.jsx'
import PageContent from '../../layout/PageContent.jsx'
import CollectionsList from './CollectionsList.jsx'
import IndexPageFooter from '../../layout/IndexPageFooter.jsx'
import LoadRemote from '../../modules/LoadRemote.jsx'

const SiteIndex = createReactClass({
  propTypes: {
    collections: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  },

  getInitialState: function () {
    return {
      collections: [],
      remoteCollectionLoaded: false,
    }
  },

  componentDidMount: function () {
    if (typeof (this.props.collections) === 'object') {
      this.setState({
        collections: this.props.collections,
      })
    } else {
      LoadRemote.loadRemoteCollection(this.props.collections, this.setValues)
    }
  },

  setValues: function (collections) {
    this.setState({
      remoteCollectionLoaded: true,
      collections: collections,
    })
    return true
  },

  componentWillMount: function () {
    document.body.className = document.body.className + ' bee-light-theme collections-bg'
  },

  cardMedia: function () {
    return (
      <div />
    )
  },

  render: function () {
    if (!this.state.remoteCollectionLoaded) {
      return null
    }
    const data = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: 'https://collections.library.nd.edu/',
      name: 'Digital Exhibits and Collections',
      author: {
        '@type': 'Organization',
        name: 'Hesburgh Library - University of Notre Dame',
      },
      description: 'Featured digital exhibits and collections.',
      publisher: {
        '@type': 'Organization',
        name: 'University of Notre Dame',
        logo: {
          '@type': 'ImageObject',
          url: 'https://onmessage.nd.edu/assets/185044/fullsize/1_university_mark.jpg',
        },
      },
    }
    return (
      <div>
        <BrandBar />
        <PageContent fluidLayout>
          <SiteIndexHeader />
          <PageContent fluidLayout={false}>
            <h2>Featured Collections</h2>
            <CollectionsList collections={this.state.collections} />
          </PageContent>
        </PageContent>
        <IndexPageFooter />
        <JSONLD data={data} />
      </div>
    )
  },

})

export default SiteIndex
