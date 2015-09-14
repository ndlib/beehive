'use strict'
var React = require('react');
var mui = require('material-ui');
var Dialog = mui.Dialog;
var SearchDisplayList = React.createClass({
  mixins: [GridListMixin, PageHeightMixin, MuiThemeMixin, DialogMixin],

  propTypes: {
    collection: React.PropTypes.object,
    items: React.PropTypes.array,
    facets: React.PropTypes.array,
    searchTerm: React.PropTypes.string,
    sortOptions: React.PropTypes.array,
    selectedIndex: React.PropTypes.number,
    selectedFacet: React.PropTypes.object,
    found: React.PropTypes.number,
    start: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      items: [],
      facets: [],
      searchTerm: "",
      found: 0,
      start: 0,
    };
  },

  outerStyle: function() {
    return {
      width: '100%',
      backgroundColor: '#f5f5f5',
    };
  },

  facets: function()  {
    if (this.props.facets.length > 0) {
      return  (
        <div className="row-fluid col-lg-3">
          <SearchFacets
            collection={this.props.collection}
            facets={this.props.facets}
            selectedFacet={this.props.selectedFacet}
          />
        </div>
      );
    }
    else {
      return null;
    }
  },

  renderInner: function() {
    var view = this.state.view;
    var itemNodes = this.props.items.map(function(item, index) {
      var nodes = [];
      nodes.push((
          <ItemListItem item={item} view={view}/>
      ));
      return nodes;
    });

    return (
      <div>
        {this.facets()}
        <div className={this.props.facets.length > 0 ? "row-fluid col-lg-9" : "row-fluid col-lg-12" }>
          <SearchPagination
            collection={this.props.collection}
            found={this.props.found}
            start={this.props.start}
          />
          <div className={this.listClass()}>
              {itemNodes}
          </div>
            <SearchPagination
              collection={this.props.collection}
              found={this.props.found}
              start={this.props.start}
            />
        </div>
      </div>
    );
  },

  render: function() {

    return (
      <div className='items-list' style={this.outerStyle()}>
        {this.displayItemWindow()}
        <div className="row">
          {this.renderButtons(this.props.collection, this.props.searchTerm, this.props.sortOptions, this.props.selectedIndex)}
          {this.renderInner()}
        </div>
        <div className='clearfix' />
      </div>
    );
  }
});

module.exports = SearchDisplayList;
