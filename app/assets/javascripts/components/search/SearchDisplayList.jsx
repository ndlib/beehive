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
      sidebar: false,
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

  componentDidMount: function() {
    if(this.props.sortOptions || this.props.facets) {
      this.setState({sidebar: true});
    }
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
    if(itemNodes.length === 0) {
      itemNodes.push((<div style={{color:'rgba(0, 0, 0, 0.870588)', fontStyle:'italic', textAlign:'center'}}>No matching results could be found.</div>));
    }

    var mainContent = (
      <div>
        {this.renderButtons(this.props.collection, this.props.searchTerm)}
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
    );
    if(this.state.sidebar) {
      return (
        <SearchSidebar
          show={this.state.sidebar}
          facets={this.props.facets}
          sortOptions={this.props.sortOptions}
          selectedIndex={this.props.selectedIndex}
          selectedFacet={this.props.selectedFacet}
        >
          {mainContent}
        </SearchSidebar>
      );
    }
    else {
      return (
        <div style={{minHeight: this.getHeight()}}>
          <div className='row-fluid col-sm-12'>
            {mainContent}
          </div>
        </div>
      );
    }
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
          {this.searchResults()}
        </div>
        <div className='clearfix' />
      </div>
    );
  }
});

module.exports = SearchDisplayList;
