
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import mui, { GridList, Paper } from 'material-ui'
var EventEmitter = require("../../middleware/EventEmitter.js");
var theme = require('../../themes/beehive.jsx');
var MediaQuery = require('react-responsive');
var SearchStore = require('../../store/SearchStore.js');
var SearchPagination = require('./SearchPagination.jsx');
var ItemListItem = require('./ItemListItem.jsx');
var SearchSidebar = require('./SearchSidebar.jsx');

var SearchDisplayList = createReactClass({
  propTypes: {
    compact: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      compact: false,
    }
  },

  getInitialState: function () {
    return {
      sidebar: false,
      view: SearchStore.view,
    };
  },

  componentDidMount: function() {
    if(SearchStore.sorts || SearchStore.facets) {
      this.setState({sidebar: true});
    }
  },

  componentWillMount: function() {
    // View changes don't change the top level query, so we have to listen
    // for those changes in order to force a rerender
    SearchStore.on("SearchStoreViewChanged", this.storeViewChanged);
  },

  storeViewChanged: function() {
    this.setState({ view: SearchStore.view });
  },

  itemList: function() {
    var view = this.state.view;
    var itemNodes = SearchStore.items.map(function(item, index) {
      return (
        <ItemListItem
          item={item}
          view={view}
          key={item["@id"]}
        />
      );
    });
    if(itemNodes.length === 0) {
      itemNodes = (<div style={{color:'rgba(0, 0, 0, 0.870588)', fontStyle:'italic', textAlign:'center'}}>No matching results could be found.</div>);
    }
    if (view == 'grid') {
      return (
        <div>
          <MediaQuery maxWidth={700}>
            <GridList cols={1} cellHeight="auto" padding={20}>
              {itemNodes}
            </GridList>
          </MediaQuery>
          <MediaQuery minWidth={700} maxWidth={1500}>
            <GridList cols={2} cellHeight="auto" padding={20}>
              {itemNodes}
            </GridList>
          </MediaQuery>
          <MediaQuery minWidth={1500}>
            <GridList cols={3} cellHeight="auto" padding={20}>
              {itemNodes}
            </GridList>
          </MediaQuery>
        </div>
      )
    } else {
      return (
        <List>
          {itemNodes}
        </List>
      )
    }
  },

  render: function() {
    return (
      <div>
        <Paper style={{width: "100%"}}>
          <h3>Browse Collection</h3>
        </Paper>
        <MediaQuery maxWidth={700}>
          <Paper>
            {this.itemList()}
            <SearchPagination />
          </Paper>
        </MediaQuery>

        <MediaQuery minWidth={700}>
          <SearchSidebar show={this.state.sidebar} />

          <Paper style={{width: "74%"}}>
            {this.itemList()}
            <SearchPagination compact={ this.props.compact } />
          </Paper>
        </MediaQuery>
      </div>
    );
  },
});

module.exports = SearchDisplayList;
