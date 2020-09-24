import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import PageContent from '../../layout/PageContent'
import BrowserUtils from '../../modules/BrowserUtils'

const useStyles = makeStyles({
  style: {
    height: props => props.height ? `${props.height}px` : '',
    overflowY: 'scroll',
    maxWidth: '60em',
    margin: '0 auto',
    paddingBottom: props => props.mobile ? '0' : '65px', // Height of title bar
  },
})

const SectionShowDescription = (props) => {
  const classes = useStyles({
    height: props.height,
    mobile: BrowserUtils.mobile(),
  })

  return (
    <PageContent>
      <div
        className={props.height ? classes.style : null}
        dangerouslySetInnerHTML={{ __html: props.section.description }}
      />
    </PageContent>
  )
}

SectionShowDescription.propTypes = {
  section: PropTypes.object.isRequired,
  height: PropTypes.number,
}

export default SectionShowDescription
