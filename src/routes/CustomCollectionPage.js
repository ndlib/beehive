import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Collection from '../components/Collection/Collection'
import HoneycombURL from '../modules/HoneycombURL'
import { withRouter } from 'react-router-dom'
const $ = require('jquery')

class CustomCollectionPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collectionResult: undefined,
    }
  }

  componentWillMount () {
    $.ajax({
      context: this,
      type: 'GET',
      url: HoneycombURL() + '/v1/collections/custom_slug/' + this.props.match.params.customSlug,
      dataType: 'json',
      success: function (result) {
        this.setState({
          collectionResult: result,
        },
        this.props.history.push('/' + result.id + '/' + result.slug),
        )
      },
      error: function (request, status, thrownError) {
        console.log('Custom slug access not available ' + thrownError)
        // window.location = window.location.origin + '/404'
      },
    })
  }

  render () {
    if (this.state.collectionResult) {
      return (
        <Collection
          collection={this.state.collectionResult}
        />
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}
CustomCollectionPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      customSlug: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}
export default withRouter(CustomCollectionPage)
