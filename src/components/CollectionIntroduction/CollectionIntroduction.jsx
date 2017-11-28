
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var CollectionPageHeader = require('../../layout/CollectionPageHeader.jsx')
var PageContent = require('../../layout/PageContent.jsx')
var CollectionPageFooter = require('../../layout/CollectionPageFooter.jsx')
var CollectionDescription = require('./CollectionDescription.jsx')
var PageTitleBar = require('../Pages/PageTitleBar.jsx')

const LoadRemote = require('../../modules/LoadRemote.jsx')

var CollectionIntroduction = createReactClass({
  propTypes: {
    collection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  },

  getInitialState: function() {
    return {
      collection: {},
      remoteCollectionLoaded: false,
    }
  },

  componentDidMount: function() {
    if ("object" == typeof(this.props.collection)) {
      this.setState({
        collection: this.props.collection,
      })
    } else {
      LoadRemote.loadRemoteCollection(this.props.collection, this.onLoaded.bind(this))
    }
  },

  onLoaded: function(result) {
    this.setState({
      remoteCollectionLoaded: true,
      collection: result
    })
  },

  render: function() {
    if(!this.state.remoteCollectionLoaded) {
      return null
    }
    return (
      <div>
        <CollectionPageHeader collection={this.state.collection} >
          <PageTitleBar title="Introduction" height={35}/>
        </CollectionPageHeader>
        <div id="TitleSpacer" style={{ height: 35, width: "100%" }} />
        <PageContent>
          <CollectionDescription collection={this.state.collection} />
        </PageContent>
        <CollectionPageFooter collection={this.state.collection} />
      </div>
    )
  }
})

module.exports = CollectionIntroduction
