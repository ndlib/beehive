'use strict'
import React, { Component, PropTypes } from 'react';

import Collection from '../components/Collection/Collection.jsx';
import HoneycombURL from '../modules/HoneycombURL.js';
import { browserHistory } from 'react-router';

class CustomCollectionPage extends Component {

  state = {
    collectionResult: undefined,
  }

  componentWillMount() {
    $.ajax({
      context: this,
      type: "GET",
      url: HoneycombURL() + "/v1/collections/custom_slug/" + this.props.params.customSlug,
      dataType: "json",
      success: function(result) {
        this.setState({
            collectionResult: result
          },
          browserHistory.push(result["id"] + "/" + result["slug"])
        );
      },
      error: function(request, status, thrownError) {
        console.log("Custom slug access not available " + thrownError);
        window.location = window.location.origin + '/404';
      }
    });
  }

  render() {
    if (this.state.collectionResult) {
      return (
        <Collection
          collection={ this.state.collectionResult }
          />
      )
    } else {
      return (
      <div>Loading...</div>
      )
    }
  }
}
export default CustomCollectionPage;
