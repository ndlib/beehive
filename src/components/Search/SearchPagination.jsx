'use strict'
var React = require('react');
var mui = require('material-ui');
var SearchStore = require('../../store/SearchStore.js');

var SearchPagination = React.createClass({
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
      var searchUrl = window.location.origin + SearchStore.searchUri({ start: (i-1)*SearchStore.rowLimit });
      return(
        <a href={searchUrl} style={this.paginationButton()}>{i}</a>
      );
    }
  },

  pageLinks: function() {
    var nodes = [];
    // if not first page
    if(SearchStore.start != 0) {
      var backLink = window.location.origin + SearchStore.searchUri({ start: 0 });
      nodes.push((<a href={backLink}> <i className="material-icons" style={{fontSize: '1em',}}>arrow_back</i> </a>));
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
      var forwardLink = window.location.origin + SearchStore.searchUri({ start: SearchStore.rowLimit*(last - 1) });
      nodes.push((<a href={forwardLink}> <i className="material-icons" style={{fontSize: '1em'}}>arrow_forward</i> </a>));
    }
    return nodes;
  },

  render: function() {
    // people think of the first record as 1, not 0.
    // Am I not a people?
    var startHuman = SearchStore.start + 1;
    var endHuman = Math.min(SearchStore.start + SearchStore.rowLimit, SearchStore.found);
    return (
      <div style={{margin: '2em 0 4em', float:'right'}}>
        <div style={{color:'rgba(0, 0, 0, 0.870588)', float: 'right', textAlign: 'right'}}>
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
