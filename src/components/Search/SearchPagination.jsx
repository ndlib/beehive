
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { Link } from 'react-router-dom'
var SearchStore = require('../../store/SearchStore.js');

var SearchPagination = createReactClass({
  propTypes: {
    compact: PropTypes.bool,
  },

  getDefaultProps: function() {
    return {
      compact: false,
    }
  },

  paginationButton: function() {
    return {
      border:'solid 1px',
      padding:'3px 5px',
      marginRight:'2px',
      verticalAlign:'top'
    };
  },

  pageLink: function(i) {
    if(SearchStore.start === (i-1) * SearchStore.rowLimit){
      return(
        <span style={this.paginationButton()}>{i}</span>
      );
    }
    else {
      var searchUrl = window.location.origin + SearchStore.searchUri({ start: (i-1)*SearchStore.rowLimit }) + "&compact=" + this.props.compact;
      return(
        <Link to={searchUrl} style={this.paginationButton()}>{i}</Link>
      );
    }
  },

  pageLinks: function() {
    var nodes = [];
    // if not first page
    if(SearchStore.start != 0) {
      var backLink = window.location.origin + SearchStore.searchUri({ start: 0 }) + "&compact=" + this.props.compact;
      nodes.push((<Link to={backLink}> <i className="material-icons" style={{fontSize: '1em',}}>arrow_back</i> </Link>));
    }
    var last = Math.floor(SearchStore.found/SearchStore.rowLimit);
    var cappedFirst = Math.max(1, Math.floor(SearchStore.start/SearchStore.rowLimit) - 2);
    var cappedLast = Math.min(Math.floor(SearchStore.start/SearchStore.rowLimit) + 4, last + 1);
    if(SearchStore.found > SearchStore.rowLimit){

      if(SearchStore.found%SearchStore.rowLimit != 0){
        last += 1;
      }
      for (var i = cappedFirst; i <= cappedLast; i++) {
        nodes.push(this.pageLink(i));
      }
    }

    // if not last page
    if(SearchStore.start + SearchStore.rowLimit < SearchStore.found) {
      var forwardLink = window.location.origin + SearchStore.searchUri({ start: SearchStore.rowLimit*(last - 1) }) + "&compact=" + this.props.compact;
      nodes.push((<Link to={forwardLink}> <i className="material-icons" style={{fontSize: '1em'}}>arrow_forward</i> </Link>));
    }
    return nodes;
  },

  render: function() {
    // people think of the first record as 1, not 0.
    // Am I not a people?
    var startHuman = SearchStore.start + 1;
    var endHuman = Math.min(SearchStore.start + SearchStore.rowLimit, SearchStore.found);
    return (
      <div style={{margin: '2em 0 4em'}}>
        <div style={{color:'rgba(0, 0, 0, 0.870588)', textAlign: 'right'}}>
          <div className="pagination">
            <span style={{marginRight:'15px', display:'inline-block', verticalAlign:'top'}}>Showing {startHuman} - {endHuman} of {SearchStore.found}</span>
            {this.pageLinks()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchPagination;
