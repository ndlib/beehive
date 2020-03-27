import React from 'react'
import PropTypes from 'prop-types'
import { CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    display: 'block',
  },
  title: {
    fontSize: '24px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
})

const CollectionCardHeader = ({ collection }) => {
  const classes = useStyles()
  return (
    <CardHeader
      className={classes.root}
      title={collection.name_line_1}
      titleTypographyProps={{
        classes: {
          root: classes.title,
        },
        variant: 'h4',
        noWrap: true,
      }}
      subheader={collection.name_line_2}
      subheaderTypographyProps={{
        classes: {
          root: classes.subtitle,
        },
        variant: 'h5',
        noWrap: true,
      }}
    />
  )
}

CollectionCardHeader.propTypes = {
  collection: PropTypes.shape({
    name_line_1: PropTypes.string,
    name_line_2: PropTypes.string,
  }).isRequired,
}

export default CollectionCardHeader
