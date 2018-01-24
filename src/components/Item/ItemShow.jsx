import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui'
import JSONLD from '../JSONLD.jsx'
const CloseButton = require('../../other/CloseButton.jsx')
const SideNavButton = require('../../other/SideNavButton.jsx')
const PageContent = require('../../layout/PageContent.jsx')
const SearchStore = require('../../store/SearchStore.js')
const ItemContent = require('./ItemContent.jsx')
const CollecitonUrl = require('../../modules/CollectionUrl.jsx')

const ItemShow = createReactClass({
  propTypes: {
    height: PropTypes.number,
    item: PropTypes.object.isRequired,
    collection: PropTypes.object.isRequired,
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
      position: 'fixed',
      width: '80%',
    }
  },

  closeButtonStyle: function () {
    return {
      color: '#ffffff',
      height: '100%',
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
      <Toolbar style={this.styles()} >
        <ToolbarGroup key={0} float='left'>
          <ToolbarTitle text={this.props.title} style={this.titleStyle()} />
        </ToolbarGroup>
        <ToolbarGroup key={1} float='right' style={this.closeButtonStyle()}>
          <CloseButton alternate />
        </ToolbarGroup>
      </Toolbar>
    )
  },

  nextButton: function () {
    let nextItem = SearchStore.getNextItem(this.props.item)
    if (nextItem) {
      return (<SideNavButton href={CollecitonUrl.itemObjectUrl(nextItem)} rightIcon />)
    }
    return ''
  },

  prevButton: function () {
    let previousItem = SearchStore.getPreviousItem(this.props.item)
    if (previousItem) {
      return (<SideNavButton href={CollecitonUrl.itemObjectUrl(previousItem)} />)
    }
    return ''
  },

  render: function () {
    const collection = this.props.collection
    const item = this.props.item
    console.log(collection)
    console.log(item)
    let articleBody = ''
    for (let property in item.metadata) {
      const dataProp = item.metadata[property]
      articleBody += `${dataProp.label}:${dataProp.values[0].value}\n`
    }
    const dataUrl = `https://collections.library.nd.edu/${collection.id}/${collection.slug}/items/${item.id}`
    const data = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': dataUrl,
      },
      'headline': item.name,
      'image': item.media.contentUrl,
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
      'datePublished': item.last_updated,
      'dateModified': item.last_updated,
      'description': item.description,
      'articleBody': articleBody,
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

module.exports = ItemShow
