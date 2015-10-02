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
      count: 10,
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
      var backLink = this.searchUrl(this.props.collection) + '&start=' + (this.props.start - this.props.count);
      nodes.push((<a href={backLink}> <i className='mdi-navigation-arrow-back' style={{fontSize: '20px'}}/> </a>));
    }
    if(this.props.found > this.props.count){
      var last = this.props.found/this.props.count;
      if(this.props.found%this.props.count != 0){
        last += 1;
      }
      for (var i = 1; i <= last; i++) {
        nodes.push(this.pageLink(i));
      }
    }
    // if not last page
    if(this.props.start + this.props.count < this.props.found) {
      var forwardLink = this.searchUrl(this.props.collection) + '&start=' + (this.props.start + this.props.count);
      nodes.push((<a href={forwardLink}> <i className='mdi-navigation-arrow-forward' style={{fontSize: '20px'}}/> </a>));
    }
    return nodes;
  },

  render: function() {
    // people think of the first record as 1, not 0.
    var startHuman = this.props.start + 1;
    var endHuman = Math.min(this.props.start + this.props.count, this.props.found);
    return (
      <div style={{margin: '2em 0'}}>
        <div className='clearfix' />
        <div style={{color:'rgba(0, 0, 0, 0.870588);', float: 'right', textAlign: 'right'}}>
          <div>Showing {startHuman} - {endHuman} of {this.props.found}</div>
          {this.pageLinks()}
        </div>
        <div className='clearfix' />
      </div>
    );
  }
});

module.exports = SearchPagination;
