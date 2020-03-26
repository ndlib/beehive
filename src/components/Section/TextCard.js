import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { CardContent, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreOverlay from './MoreOverlay'

const useStyles = makeStyles({
  title: {
    color: 'lightgrey',
    display: 'block',
    fontSize: '24px',
    lineHeight: '36px',
  },
  container: {
    color: 'lightgrey',
    paddingTop: '0',
    maxWidth: `${Math.floor(window.innerWidth * 0.9)}px`,
  },
})

const TextCard = ({ section }) => {
  const [showMoreLink, setShowMoreLink] = useState(false)
  const sectionHeader = useRef()
  const sectionContent = useRef()

  useEffect(() => {
    const shouldShowMore = (() => {
      const headerElement = sectionHeader.current
      const contentElement = sectionContent.current
      if (contentElement) {
        const testHeight = contentElement.offsetParent.clientHeight - (
          headerElement ? headerElement.clientHeight : 0
        )
        return contentElement.clientHeight > testHeight
      }
      return false
    })()
    setShowMoreLink(shouldShowMore)
  }, [setShowMoreLink])

  const classes = useStyles()
  const title = (
    <div className='sectionTitleContent'>{section.name}</div>
  )
  return (
    <div className={`text ${classes.container}`}>
      <CardHeader ref={sectionHeader} title={title} classes={{ title: classes.title }} />
      <CardContent ref={sectionContent} className={classes.container}>
        <div
          className='sectionTextContent'
          dangerouslySetInnerHTML={{ __html: section.description }}
        />
        {showMoreLink && (
          <MoreOverlay />
        )}
      </CardContent>
    </div>
  )
}

TextCard.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
}

export default TextCard
