import React from 'react'
import { Card, CardMedia, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HeaderOverlay from './HeaderOverlay'
import CoverImage from 'assets/images/home.jpg'

const useStyles = makeStyles({
  cardStyle: {
    height:'40vh',
    position:'relative',
    left:'0',
    right:'0',
    marginTop: props => props.useSmallStyle ? '0px' : '50px',
  },
})

const SiteIndexHeader = () => {
  const useSmallStyle = useMediaQuery('(max-width:649px)')
  const classes = useStyles({
    useSmallStyle,
  })
  return (
    <Card className={classes.cardStyle}>
      <CardMedia className='collectionscover' style={{ height:'100%' }}>
        <div className='coverImage'><img src={CoverImage} alt='' /></div>
        <HeaderOverlay useSmallStyle={useSmallStyle} />
      </CardMedia>
    </Card>
  )
}

export default SiteIndexHeader
