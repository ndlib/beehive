import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
const PageContent = require('../../layout/PageContent.jsx')
const CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
const PagesShow = require('../Pages/PagesShow.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')

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
    if (!this.state.remoteCollectionLoaded) {
      return null
    }

    let pageContent = null
    if (this.state.collection && this.state.collection.about) {
      pageContent = (
        <PagesShow title='About' content={this.state.collection.about} />
      )
    }

    return (
      <div>
        <CollectionPageHeader collection={this.state.collection} branding />
        <PageContent>
          {pageContent}
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    )
  },
})

module.exports = About
