import React, { useState, useEffect } from 'react'
import { GridList, List, Paper, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchStore from '../../store/SearchStore'
import SearchPagination from './SearchPagination'
import ItemListItem from './ItemListItem'
import SearchSidebar from './SearchSidebar'

const useStyles = makeStyles({
  header: {
    width: '100%',
  },
  listContainer: {
    width: props => props.isSmall ? '100%' : '74%',
  },
  noItems: {
    color: 'rgba(0, 0, 0, 0.870588)',
    fontStyle: 'italic',
    textAlign: 'center',
  },
})

const SearchDisplayList = () => {
  const sidebar = !!(SearchStore.facets && SearchStore.facets.length)
  const [view, setView] = useState(SearchStore.view)
  const [storeChanged, setStoreChanged] = useState(new Date()) // eslint-disable-line no-unused-vars

  useEffect(() => {
    const action = () => setStoreChanged(new Date())
    SearchStore.on('SearchStoreChanged', action)
    return () => SearchStore.off('SearchStoreChanged', action)
  })

  useEffect(() => {
    const action = () => setView(SearchStore.view)
    SearchStore.on('SearchStoreViewChanged', action)
    return () => SearchStore.off('SearchStoreViewChanged', action)
  })

  const isSmall = useMediaQuery('(max-width: 699px)')
  const isLarge = useMediaQuery('(min-width: 1280px)')
  const classes = useStyles({
    isSmall,
  })

  const gridColumns = isLarge ? 3 : (isSmall ? 1 : 2)
  const itemNodes = SearchStore.items.length ? SearchStore.items.map(item => (
    <ItemListItem key={item.id} item={item} view={view} />
  )) : (
    <div className={classes.noItems}>
      No matching results could be found.
    </div>
  )
  return (
    <React.Fragment>
      <Paper className={classes.header} elevation={0}>
        <h2>Browse Collection</h2>
      </Paper>
      {!isSmall && (
        <SearchSidebar show={sidebar} />
      )}
      <Paper className={classes.listContainer} elevation={0}>
        <SearchPagination />
        {view === 'grid' ? (
          <GridList cols={gridColumns} cellHeight='auto' spacing={20}>
            {itemNodes}
          </GridList>
        ) : (
          <List>
            {itemNodes}
          </List>
        )}
        <SearchPagination />
      </Paper>
    </React.Fragment>
  )
}

export default SearchDisplayList
