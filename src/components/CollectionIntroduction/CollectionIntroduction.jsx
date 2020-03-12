import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
const CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
const PageContent = require('../../layout/PageContent.jsx')
const CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
const CollectionDescription = require('./CollectionDescription.jsx')
const PageTitleBar = require('../Pages/PageTitleBar.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')

const CollectionIntroduction = createReactClass({
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
      LoadRemote.loadRemoteCollection(this.props.collection, this.onLoaded.bind(this))
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
    return (
      <div>
        <CollectionPageHeader collection={this.state.collection}>
          <PageTitleBar title='Introduction' height={35} />
        </CollectionPageHeader>
        <div id='TitleSpacer' style={{ height: 35, width: '100%' }} />
        <PageContent>
          <CollectionDescription collection={this.state.collection} />
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    )
  },
})

export default CollectionIntroduction
