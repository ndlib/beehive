'use strict'
var React = require('react');
var mui = require('material-ui');

var SearchPagination = React.createClass({
  mixins: [SearchUrlMixin],
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

  pageLink: function(i) {
    if(this.props.start === (i-1) * this.props.count){
      return(
        <span> {i} </span>
      );
    }
    else {
      var searchUrl = this.searchUrl(this.props.collection) + '&start=' + (i-1)*this.props.count;
      return(
        <a href={searchUrl}> {i} </a>
      );
    }
  },

  pageLinks: function() {
    var nodes = [];
    // if not first page
    if(this.props.start != 0) {
      var backLink = this.searchUrl(this.props.collection) + '&start=0';
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
      var forwardLink = this.searchUrl(this.props.collection) + '&start=' + this.props.count*(last - 1);
      nodes.push((<a href={forwardLink}> <i className="material-icons" style={{fontSize: '1em',}}>arrow_forward</i> </a>));
    }
    return nodes;
  },

  render: function() {
    // people think of the first record as 1, not 0.
    var startHuman = this.props.start + 1;
    var endHuman = Math.min(this.props.start + this.props.count, this.props.found);
    return (
      <div style={{margin: '2em 0'}}>
        <div style={{color:'rgba(0, 0, 0, 0.870588);', float: 'right', textAlign: 'right'}}>
          <div>
            Showing {startHuman} - {endHuman} of {this.props.found}
            {this.pageLinks()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchPagination;
