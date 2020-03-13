import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { GridList, List, Paper } from '@material-ui/core'
import MediaQuery from 'react-responsive'
import SearchStore from '../../store/SearchStore.js'
import SearchPagination from './SearchPagination.jsx'
import ItemListItem from './ItemListItem.jsx'
import SearchSidebar from './SearchSidebar.jsx'

const SearchDisplayList = createReactClass({
  propTypes: {
    compact: PropTypes.bool,
  },
  getDefaultProps: function () {
    return {
      compact: false,
    }
  },

  getInitialState: function () {
    return {
      sidebar: false,
      view: SearchStore.view,
    }
  },

  componentDidMount: function () {
    if (SearchStore.facets && SearchStore.facets.length) {
      this.setState({ sidebar: true })
    }
  },

  componentWillMount: function () {
    // View changes don't change the top level query, so we have to listen
    // for those changes in order to force a rerender
    SearchStore.on('SearchStoreViewChanged', this.storeViewChanged)
  },

  storeViewChanged: function () {
    this.setState({ view: SearchStore.view })
  },

  itemList: function () {
    const view = this.state.view
    let itemNodes = SearchStore.items.map(function (item) {
      return (
        <ItemListItem
          item={item}
          view={view}
          key={item['@id']}
        />
      )
    })
    if (itemNodes.length === 0) {
      itemNodes = (
        <div style={{ color:'rgba(0, 0, 0, 0.870588)', fontStyle:'italic', textAlign:'center' }}>
          No matching results could be found.
        </div>
      )
    }
    if (view === 'grid') {
      return (
        <div>
          <MediaQuery maxWidth={700}>
            <GridList cols={1} cellHeight='auto' padding={20}>
              {itemNodes}
            </GridList>
          </MediaQuery>
          <MediaQuery minWidth={700} maxWidth={1280}>
            <GridList cols={2} cellHeight='auto' padding={20}>
              {itemNodes}
            </GridList>
          </MediaQuery>
          <MediaQuery minWidth={1280}>
            <GridList cols={3} cellHeight='auto' padding={20}>
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

  render: function () {
    return (
      <div>
        <Paper style={{ width: '100%' }} zDepth={0}>
          <h2>Browse Collection</h2>
        </Paper>
        <MediaQuery maxWidth={700}>
          <Paper zDepth={0}>
            <SearchPagination />
            {this.itemList()}
            <SearchPagination />
          </Paper>
        </MediaQuery>

        <MediaQuery minWidth={700}>
          <SearchSidebar show={this.state.sidebar} />

          <Paper style={{ width: '74%' }} zDepth={0}>
            <SearchPagination compact={this.props.compact} />
            {this.itemList()}
            <SearchPagination compact={this.props.compact} />
          </Paper>
        </MediaQuery>
      </div>
    )
  },
})

export default SearchDisplayList
