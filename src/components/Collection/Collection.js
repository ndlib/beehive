import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import JSONLD from '../JSONLD'
import RemoveMarkup from '../../modules/RemoveMarkup'
import CollectionPageHeader from '../../layout/CollectionPageHeader'
import CollectionShow from './CollectionShow'
import PageContent from '../../layout/PageContent'
import CollectionIntro from './CollectionIntro'
import CollectionShowSitePath from './CollectionShowSitePath'
import CollectionPageFooter from '../../layout/CollectionPageFooter'
import PageTitle from '../../modules/PageTitle'
import ConfigurationStore from '../../store/ConfigurationStore'
import ConfigurationActions from '../../actions/ConfigurationActions'
import LoadRemote from '../../modules/LoadRemote'

const Collection = (props) => {
  const [collection, setCollection] = useState({})
  const [remoteCollectionLoaded, setRemoteCollectionLoaded] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [configurationLoaded, setConfigurationLoaded] = useState(ConfigurationStore.loaded)

  useEffect(() => {
    document.body.className = document.body.className + ' collection'
    if (typeof (props.collection) === 'object') {
      setCollection(props.collection)
    } else {
      const onLoaded = (result) => {
        setCollection(result)
        setRemoteCollectionLoaded(true)
      }
      LoadRemote.loadRemoteCollection(props.collection, onLoaded)
    }

    const onConfigurationLoaded = () => setConfigurationLoaded(true)
    ConfigurationStore.addChangeListener(onConfigurationLoaded)
    ConfigurationActions.load(props.collection)
    return () => ConfigurationStore.removeChangeListener(onConfigurationLoaded)
  }, [props.collection])

  if (!remoteCollectionLoaded) {
    return null
  }
  PageTitle(collection.name)
  const url = `${process.env.PUBLIC_URL}/${collection.id}/${collection.slug}`
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
  )
}

Collection.propTypes = {
  collection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default Collection
