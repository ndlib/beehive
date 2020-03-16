import React from 'react'
import PropTypes from 'prop-types'

const SiteHeaderOverlay = ({ useSmallStyle }) => {
  const titleStyle = {
    height:'0',
    backgroundImage: 'url(/images/dec.logo.svg)',
    backgroundSize:'cover',
    backgroundRepeat:'none',
    overflow:'hidden',
    position:'absolute',
    paddingTop:'132px',
    width:'400px',
    left:'60px',
    top:'60px',
  }
  if (useSmallStyle) {
    titleStyle.paddingTop = '31vw'
    titleStyle.paddingRight = '60px'
    titleStyle.width = '94vw'
    titleStyle.top = '3vw'
    titleStyle.left = '3vw'
  }
  return (
    <div style={{ background: 'transparent', position: 'static' }}>
      <span title='Digital Exhibits and Collections' style={titleStyle} />
      {!useSmallStyle && (
        <span
          title='Powered by HoneyComb'
          style={{
            height:'0',
            backgroundImage: 'url(/images/powered.png)',
            backgroundSize:'cover',
            overflow:'hidden',
            position:'absolute',
            paddingTop:'57px',
            width:'200px',
            right:'60px',
            bottom:'40px',
          }}
        />
      )}
    </div>
  )
}

SiteHeaderOverlay.propTypes = {
  useSmallStyle: PropTypes.bool,
}

export default SiteHeaderOverlay
