import React from 'react'
import PropTypes from 'prop-types'
import { GridList, GridListTile, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CollectionCard from './CollectionCard'

const reverseComponents = (components) => {
  const temp = []
  const len = components.length
  for (let i = (len - 1); i !== -1; i--) {
    temp.push(components[i])
  }
  return temp
}

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}))

const CollectionsList = ({ collections }) => {
  const isMedium = useMediaQuery('(min-width:650px)')
  const isLarge = useMediaQuery('(min-width:1725px)')
  const columnCount = isLarge ? 3 : (isMedium ? 2 : 1)
  const classes = useStyles()

  return (
    <GridList cols={columnCount} cellHeight='auto' spacing={24} className={classes.list}>
      {reverseComponents(collections).map((collection) => (
        <GridListTile key={collection.id}>
          <CollectionCard collection={collection} cardHeight='450' />
        </GridListTile>
      ))}
    </GridList>
  )
}

CollectionsList.propTypes = {
  collections: PropTypes.array,
}

export default CollectionsList
