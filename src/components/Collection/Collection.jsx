import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import JSONLD from '../JSONLD.jsx'
import RemoveMarkup from '../../modules/RemoveMarkup'
import CollectionPageHeader from '../../layout/CollectionPageHeader.jsx'
import CollectionShow from './CollectionShow.jsx'
import PageContent from '../../layout/PageContent.jsx'
import CollectionIntro from './CollectionIntro.jsx'
import CollectionShowSitePath from './CollectionShowSitePath.jsx'
import CollectionPageFooter from '../../layout/CollectionPageFooter.jsx'
import PageTitle from '../../modules/PageTitle.js'
import ConfigurationStore from '../../store/ConfigurationStore.js'
import ConfigurationActions from '../../actions/ConfigurationActions.js'
import LoadRemote from '../../modules/LoadRemote.jsx'

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
      configurationLoaded: ConfigurationStore.loaded(),
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
    ConfigurationStore.addChangeListener(this.configurationLoaded)
    ConfigurationActions.load(this.props.collection)
  },

  componentWillUnmount: function () {
    ConfigurationStore.removeChangeListener(this.configurationLoaded)
  },

  configurationLoaded: function () {
    this.setState({ configurationLoaded: true })
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
    const url = `https://collections.library.nd.edu/${collection.id}/${collection.slug}`
    let data = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: url,
      name: collection.name,
      author: {
        '@type': 'Organization',
        name: 'Hesburgh Library - University of Notre Dame',
      },
      description: RemoveMarkup(collection.short_description),
      publisher: {
        '@type': 'Organization',
        name: 'University of Notre Dame',
        logo: {
          '@type': 'ImageObject',
          url: 'https://onmessage.nd.edu/assets/185044/fullsize/1_university_mark.jpg',
        },
      },
    }
    if (ConfigurationStore.browseEnabled()) {
      data = Object.assign(data, {
        potentialAction: {
          '@type': 'SearchAction',
          target: `${url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      })
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

export default Collection
