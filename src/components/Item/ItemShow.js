import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import JSONLD from '../JSONLD'
import CloseButton from '../../other/CloseButton'
import SideNavButton from '../../other/SideNavButton'
import PageContent from '../../layout/PageContent'
import SearchStore from '../../store/SearchStore'
import ItemContent from './ItemContent'
import CollecitonUrl from '../../modules/CollectionUrl'

const useStyles = makeStyles({
  toolbar: {
    backgroundColor: 'rgba(51,51,51,1)',
    overflow: 'hidden',
  },
  title: {
    color: 'white',
    lineHeight: '24px',
    fontSize: '20px',
  },
  page: {
    height: props => `${props.height}px`,
    width: '100%',
    position: 'fixed',
    backgroundColor: '#ffffff',
    zIndex: '4',
  },
})

const ItemShow = ({ item, collection, title, height }) => {
  const nextItem = SearchStore.getNextItem(item)
  const previousItem = SearchStore.getPreviousItem(item)
  const classes = useStyles({
    height,
  })

  let articleBody = ''
  for (const property in item.metadata) {
    const dataProp = item.metadata[property]
    articleBody += `${dataProp.label}:${dataProp.values[0].value}\n`
  }
  const dataUrl = `https://collections.library.nd.edu/${collection.id}/${collection.slug}/items/${item.id}`
  const data = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': dataUrl,
    },
    headline: item.name,
    image: item.media.contentUrl,
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
    datePublished: item.last_updated,
    dateModified: item.last_updated,
    description: item.description,
    articleBody: articleBody,
  }
  return (
    <PageContent fluidLayout>
      <Paper className={classes.page}>
        <Toolbar className={`title-bar ${classes.toolbar}`}>
          <Typography variant='h2' className={classes.title}>{title}</Typography>
          <CloseButton />
        </Toolbar>
        {previousItem && (
          <SideNavButton href={CollecitonUrl.itemObjectUrl(previousItem)} />
        )}
        {nextItem && (
          <SideNavButton href={CollecitonUrl.itemObjectUrl(nextItem)} rightIcon />
        )}
        <ItemContent item={item} height={height} />
      </Paper>
      <JSONLD data={data} />
    </PageContent>
  )
}

ItemShow.propTypes = {
  height: PropTypes.number,
  item: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default ItemShow
