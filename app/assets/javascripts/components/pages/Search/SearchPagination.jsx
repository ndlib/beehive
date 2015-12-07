'use strict'
var React = require('react');
var mui = require('material-ui');
var SearchStore = require('../../../stores/Search');

var SearchPagination = React.createClass({
  propTypes: {
    collection: React.PropTypes.object.isRequired,
    found: React.PropTypes.number,
    start: React.PropTypes.number,
    count: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      found: 0,
      start: 0,
      count: 12,
    };
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
    if(this.props.start === (i-1) * this.props.count){
      return(
        <span style={this.paginationButton()}>{i}</span>
      );
    }
    else {
      var searchUrl = window.location.origin + SearchStore.searchUri() + '&start=' + (i-1)*this.props.count;
      return(
        <a href={searchUrl} style={this.paginationButton()}>{i}</a>
      );
    }
  },

  pageLinks: function() {
    var nodes = [];
    // if not first page
    if(this.props.start != 0) {
      var backLink = window.location.origin + SearchStore.searchUri() + '&start=0';
      nodes.push((<a href={backLink}> <i className="material-icons" style={{fontSize: '1em',}}>arrow_back</i> </a>));
    }
    var last = Math.floor(this.props.found/this.props.count);
    var cappedFirst = Math.max(1, Math.floor(this.props.start/this.props.count) - 2);
    var cappedLast = Math.min(Math.floor(this.props.start/this.props.count) + 4, last + 1);
    if(this.props.found > this.props.count){

      if(this.props.found%this.props.count != 0){
        last += 1;
      }
      for (var i = cappedFirst; i <= cappedLast; i++) {
        nodes.push(this.pageLink(i));
      }
    }

    // if not last page
    if(this.props.start + this.props.count < this.props.found) {
      var forwardLink = window.location.origin + SearchStore.searchUri() + '&start=' + this.props.count*(last - 1);
      nodes.push((<a href={forwardLink}> <i className="material-icons" style={{fontSize: '1em'}}>arrow_forward</i> </a>));
    }
    return nodes;
  },

  render: function() {
    // people think of the first record as 1, not 0.
    // Am I not a people?
    var startHuman = this.props.start + 1;
    var endHuman = Math.min(this.props.start + this.props.count, this.props.found);
    return (
      <div style={{margin: '2em 0 4em', float:'right'}}>
        <div style={{color:'rgba(0, 0, 0, 0.870588)', float: 'right', textAlign: 'right'}}>
          <div className="pagination">
            <span style={{marginRight:'15px', display:'inline-block', verticalAlign:'top'}}>Showing {startHuman} - {endHuman} of {this.props.found}</span>
            {this.pageLinks()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchPagination;
