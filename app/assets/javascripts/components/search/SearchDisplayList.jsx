'use strict'
var React = require('react');
var mui = require('material-ui');
var SearchDisplayList = React.createClass({
  mixins: [CollectionUrlMixin, GridListMixin, PageHeightMixin, MuiThemeMixin, LoadRemoteMixin],

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

  getInitialState: function () {
    return {
      currentItem: null,
    };
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

  componentWillMount: function() {
    EventEmitter.on("ItemDialogWindow", this.setCurrentItem);
    if(window.location.hash) {
      this.loadRemoteItem(this.collectionUrl(this.props.collection) +  window.location.hash.replace("#", ""));
    }
  },

  setCurrentItem: function(item) {
    this.setState({
      currentItem: item,
    });

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

  nextUrl: function(index) {
    var id;
    if (index <  window.searchStore.items.length - 1) {
      id = window.searchStore.items[index + 1];
    }
    return id;
  },

  prevUrl: function(index) {
    var id;
    if (index > 0) {
      id = window.searchStore.items[index - 1];
    }
    return id;
  },

  searchResults: function() {
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
    var prev, next;
    if(this.state.currentItem){
      if(window.searchStore && window.searchStore.items) {
        var index = window.searchStore.items.indexOf(this.state.currentItem['@id']);
        prev = this.prevUrl(index);
        next = this.nextUrl(index);
      }
    }
    return (
      <div className='items-list' style={this.outerStyle()}>
        <DialogWindow
          previousUrl={prev}
          nextUrl={next}
        >
          <ItemShow
            item={this.state.currentItem}
            height={this.state.height}
          />
        </DialogWindow>
        <div className="row">
          {this.renderButtons(this.props.collection, this.props.searchTerm, this.props.sortOptions, this.props.selectedIndex)}
          {this.searchResults()}
        </div>
        <div className='clearfix' />
      </div>
    );
  }
});

module.exports = SearchDisplayList;
