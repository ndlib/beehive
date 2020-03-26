import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import JSONLD from '../JSONLD'
import RemoveMarkup from '../../modules/RemoveMarkup'
import CollectionPageHeader from '../../layout/CollectionPageHeader'
import PageContent from '../../layout/PageContent'
import CollectionPageFooter from '../../layout/CollectionPageFooter'
import PagesShow from './PagesShow'
import PageTitleBar from './PageTitleBar'
import SitePathCard from '../Collection/SitePathCard'
import PreviewLink from '../../layout/PreviewLink'
import ConfigurationActions from '../../actions/ConfigurationActions'
import ConfigurationStore from '../../store/ConfigurationStore'
import PageTitle from '../../modules/PageTitle'
import LoadRemote from '../../modules/LoadRemote'

const useStyles = makeStyles({
  pathCardContainer: {
    margin: props => props.isWide ? '0 auto' : '0 0',
    maxWidth: '500px',
  },
})

const Page = (props) => {
  const [collection, setCollection] = useState({})
  const [remoteCollectionLoaded, setRemoteCollectionLoaded] = useState(false)
  const [isConfigurationLoaded, setIsConfigurationLoaded] = useState(false) // eslint-disable-line no-unused-vars
  const isWide = useMediaQuery('(min-width: 1000px)')
  const classes = useStyles({
    isWide,
  })

  useEffect(() => {
    // Callback from loadRemoteCollection
    const setValues = (result) => {
      ConfigurationActions.load(result)
      if (result.pages.items) {
        // Creates doubly linked list from items to make subsequent
        // item navigation operations easier/faster
        result.pages.items.forEach((item, i, array) => {
          const nextI = i + 1
          const prevI = i - 1
          if (nextI < array.length) {
            item.nextItem = array[nextI]
          }
          if (prevI >= 0) {
            item.previousItem = array[prevI]
          }
        })
      }
      setCollection(result)
      setRemoteCollectionLoaded(true)
      return true
    }

    const configurationLoaded = () => setIsConfigurationLoaded(true)
    ConfigurationStore.addChangeListener(configurationLoaded)
    if (typeof (props.collection) === 'object') {
      setValues(props.collection)
    } else {
      LoadRemote.loadRemoteCollection(props.collection, setValues)
    }
    return () => ConfigurationStore.removeChangeListener(configurationLoaded)
  }, [props.collection])

  if (!remoteCollectionLoaded) {
    return null
  }

  PageTitle(collection.name)

  const contentMouseOver = (event) => {
    const itemId = event.target.getAttribute('item_id')
    const item = (itemId && collection.pages.items) ? collection.pages.items.find(e => e.id === itemId) : null
    if (item) {
      event.target.style.cursor = 'pointer'
    }
  }
  const pageContent = (collection && collection.pages) ? collection.pages.content : null
  const image = (collection.pages.image && collection.pages.image.contentUrl) ? collection.pages.image.contentUrl : ''
  const dataUrl = `https://collections.library.nd.edu/${collection.id}/${collection.slug}/${collection.pages.id}/` +
    collection.pages.slug
  const data = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': dataUrl,
    },
    headline: `About ${collection.pages.name}`,
    image: image,
    genre: 'academic library collection',
    keywords: 'notre dame special collections digital exhibits library',
    author: {
      '@type': 'Organization',
      name: 'Hesburgh Library - University of Notre Dame',
    },
    publisher: {
      '@type': 'Organization',
      name: 'University of Notre Dame',
      logo: {
        '@type': 'ImageObject',
        url: 'https://onmessage.nd.edu/assets/185044/fullsize/1_university_mark.jpg',
      },
    },
    url: dataUrl,
    datePublished: collection.pages.last_updated,
    dateModified: collection.pages.last_updated,
    description: RemoveMarkup(pageContent),
    articleBody: RemoveMarkup(pageContent),
  }
  return (
    <div>
      <CollectionPageHeader collection={collection} branding={false} />
      <PageTitleBar title={collection.pages.name} height={56} />
      <PageContent onMouseOver={contentMouseOver}>
        <PagesShow content={pageContent}>
          {collection.pages.nextObject && (
            <React.Fragment>
              <div style={{ clear: 'both' }}>
                <hr />
                <div className={classes.pathCardContainer}>
                  <SitePathCard
                    headerTitle='Continue to'
                    siteObject={collection.pages.nextObject}
                    addNextButton
                    fixedSize={false}
                  />
                </div>
              </div>
              <PreviewLink siteObject={collection.pages.nextObject} />
            </React.Fragment>
          )}
        </PagesShow>
      </PageContent>
      <CollectionPageFooter collection={collection} />
      <JSONLD data={data} />
    </div>
  )
}

Page.propTypes = {
  collection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default Page
