import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Toolbar, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseButton from '../../other/CloseButton'
import SideNavButton from '../../other/SideNavButton'
import ItemContent from '../Item/ItemContent'
import SectionShowDescription from './SectionShowDescription'
import CollectionUrl from '../../modules/CollectionUrl'

const useStyles = makeStyles({
  toolbar: {
    backgroundColor: 'rgba(51,51,51,1)',
    overflow: 'hidden',
  },
  title: {
    color: '#ffffff',
    lineHeight: '24px',
    fontSize: '20px',
  },
  page: {
    height: props => `${props.height}px`,
    width: '100%',
    position: 'fixed',
    backgroundColor: '#ffffff',
    zIndex: '4',
  },
})

const SectionShow = ({ section, height, previousSection, nextSection }) => {
  const isMobile = useMediaQuery('(max-width: 649px)')
  const classes = useStyles({
    height,
    isMobile,
  })
  if (!section) {
    return null
  }

  const title = section.item ? section.item.name : section.name
  return (
    <Paper className={classes.page}>
      <Toolbar className={`title-bar ${classes.toolbar}`}>
        <Typography variant='h2' className={classes.title} noWrap>{title}</Typography>
        <CloseButton />
      </Toolbar>
      {previousSection && (
        <SideNavButton href={CollectionUrl.sectionObjectUrl(previousSection)} />
      )}
      {nextSection && (
        <SideNavButton href={CollectionUrl.sectionObjectUrl(nextSection)} rightIcon />
      )}
      {section.item ? (
        <ItemContent height={height} item={section.item} additionalDetails={section.description} />
      ) : (
        <SectionShowDescription height={height} section={section} />
      )}
    </Paper>
  )
}

SectionShow.propTypes = {
  section: PropTypes.object,
  previousSection: PropTypes.object,
  nextSection: PropTypes.object,
  height: PropTypes.number,
}

export default SectionShow
