import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const SiteIndexHeader = require('./SiteIndexHeader.jsx')
const BrandBar = require('../../layout/BrandBar.jsx')
const PageContent = require('../../layout/PageContent.jsx')
const CollectionsList = require('./CollectionsList.jsx')
const IndexPageFooter = require('../../layout/IndexPageFooter.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')

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
      </div>
    )
  },

})

module.exports = SiteIndex
