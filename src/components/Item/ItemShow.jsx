import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper, Toolbar, Typography } from '@material-ui/core'
import JSONLD from '../JSONLD.jsx'
const CloseButton = require('../../other/CloseButton.jsx')
const SideNavButton = require('../../other/SideNavButton.jsx')
const PageContent = require('../../layout/PageContent.jsx')
const SearchStore = require('../../store/SearchStore.js')
const ItemContent = require('./ItemContent.jsx')
const BrowserUtils = require('../../modules/BrowserUtils.jsx')
const CollecitonUrl = require('../../modules/CollectionUrl.jsx')

const ItemShow = createReactClass({
  propTypes: {
    height: PropTypes.number,
    item: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  },

  styles: function () {
    return {
      backgroundColor: 'rgba(51,51,51,1)',
      display: 'block',
      overflow: 'hidden',
    }
  },

  titleStyle: function () {
    return {
      color: '#ffffff',
      lineHeight: BrowserUtils.mobile() ? '24px' : '56px',
    }
  },

  closeButtonStyle: function () {
    return {
      color: '#ffffff',
      height: '100%',
      float: 'right',
    }
  },

  pageStyles: function () {
    return {
      height: this.props.height + 'px',
      width: '100%',
      position: 'fixed',
      backgroundColor: '#ffffff',
      zIndex: '4',
    }
  },

  toolbar: function () {
    return (
      <Toolbar className='title-bar' style={this.styles()}>
        <div style={{ maxWidth: this.mobile ? '80%' : '90%', float: 'left' }}>
          <Typography variant='h2' style={this.titleStyle()}>{this.props.title}</Typography>
        </div>
        <div style={this.closeButtonStyle()}>
          <CloseButton alternate />
        </div>
      </Toolbar>
    )
  },

  nextButton: function () {
    const nextItem = SearchStore.getNextItem(this.props.item)
    if (nextItem) {
      return (<SideNavButton href={CollecitonUrl.itemObjectUrl(nextItem)} rightIcon />)
    }
    return ''
  },

  prevButton: function () {
    const previousItem = SearchStore.getPreviousItem(this.props.item)
    if (previousItem) {
      return (<SideNavButton href={CollecitonUrl.itemObjectUrl(previousItem)} />)
    }
    return ''
  },

  render: function () {
    const collection = this.props.collection
    const item = this.props.item
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
        <Paper style={this.pageStyles()}>
          {this.toolbar()}
          {this.prevButton()}
          {this.nextButton()}
          <ItemContent item={item} height={this.props.height} />
        </Paper>
        <JSONLD data={data} />
      </PageContent>
    )
  },
})

export default ItemShow
