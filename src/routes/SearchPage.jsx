'use strict'
import React, { Component, PropTypes } from 'react';
import Search from '../components/Search//Search.jsx';
import QueryParm from '../modules/QueryParam.js';

class SearchPage extends Component {

  render() {
    return (
      <div>
        <Search
          collection={"http://localhost:3017" + "/v1/collections/"
            + this.props.params.collectionID}
          hits={'http://localhost:3017' + '/v1/collections/' + this.props.params.collectionID + '/search'}
          searchTerm={QueryParm('q')}
          sortTerm={QueryParm('sort')}
          facet={QueryParm('facet')}
          start={QueryParm('start')}
          view={QueryParm('view')}
        />
        {this.props.children}
      </div>
    )
  }
}

export default SearchPage;
