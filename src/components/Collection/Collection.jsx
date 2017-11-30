import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

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
    if (!this.state.remoteCollectionLoaded) {
      return null
    }
    PageTitle(this.state.collection.name)
    return (
      <div>
        <div className='collection-show-page'>
          <CollectionPageHeader collection={this.state.collection} branding />
          <CollectionShow collection={this.state.collection} />
          <PageContent fluidLayout={false}>
            <CollectionIntro collection={this.state.collection} />
            <CollectionShowSitePath collection={this.state.collection} />
          </PageContent>
          <CollectionPageFooter collection={this.state.collection} />
        </div>
      </div>
    )
  },
})

module.exports = Collection
