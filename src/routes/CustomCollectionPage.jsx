'use strict'
import React, { Component, PropTypes } from 'react';

import Collection from '../components/Collection/Collection.jsx';
import HoneycombURL from '../modules/HoneycombURL.js'

class CustomCollectionPage extends Component {

  state = {
      collectionResult: undefined,
  }

  componentWillMount() {
    console.log("component will mount", this.props.params)
    $.ajax({
      context: this,
      type: "GET",
      url: HoneycombURL() + "/v1/collections/custom_slug/" + this.props.params.customSlug,
      dataType: "json",
      success: function(result) {
        this.setState({
          collectionResult: result
        });
      },
      error: function(request, status, thrownError) {
        console.log("Custom slug access not available " + thrownError);
        window.location = window.location.origin + '/404';
      }
    });
  }

  render() {
    console.log("render called");
    console.log(this.state.collectionResult);
    if (this.state.collectionResult) {
      return (
        <Collection
          collection={ this.state.collectionResult["@id"] + "/site_path" }
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
