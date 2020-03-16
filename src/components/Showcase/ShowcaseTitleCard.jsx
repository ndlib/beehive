import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, CardHeader, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    display: 'inline-block',
    verticalAlign: 'top',
    position: 'relative',
    padding: '5px',
    textAlign: 'center',
    overflow: 'hidden',
    width: '85vw',
    boxShadow: 'none',
    backgroundColor: 'rgba(0,0,0,0)',
    height: props => props.height ? (props.height + 'px') : undefined,
  },
  header: {
    textShadow: '2px 2px 3px #333333',
    textTransform: 'uppercase',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.1)',
    whiteSpace: 'normal',
    lineHeight: '2em !important',
    marginTop: props => props.height ? (Math.round(props.height * 0.15) + 'px') : undefined,
  },
  title: {
    color: '#fff',
    fontSize: '4vw',
    paddingBottom: '10px',
    lineHeight: '4.1vw',
  },
  subtitle: {
    color: '#fff',
    fontSize: '3vw',
    lineHeight:'3.1vw',
  },
  description: {
    color: '#fff',
    textShadow: '1px 1px 2px #333333',
    fontSize: '18px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    whiteSpace: 'normal',
  },
})

const ShowcaseTitleCard = ({ showcase, height }) => {
  const isMobile = useMediaQuery('(max-width: 649px)')
  const classes = useStyles({
    height,
  })
  return (
    <Card className={classes.container}>
      <CardHeader
        title={showcase.name_line_1}
        subheader={showcase.name_line_2}
        classes={{
          root: classes.header,
          title: classes.title,
          subheader: classes.subtitle,
        }}
      />
      {!isMobile && (
        <CardContent className={classes.description}>
          {showcase.description || null}
        </CardContent>
      )}
    </Card>
  )
}

ShowcaseTitleCard.propTypes = {
  showcase: PropTypes.shape({
    name_line_1: PropTypes.string,
    name_line_2: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  height: PropTypes.number,
}

ShowcaseTitleCard.defaultProps = {
  height: 0,
}

export default ShowcaseTitleCard
