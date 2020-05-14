import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SideNavButton from './SideNavButton'
const $ = require('jquery')

const Scroller = ({ target, height }) => {
  const [element, setElement] = useState()
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const el = document.getElementById(target) || {}
    setElement(el)

    const onScroll = () => {
      setScrollLeft(el.scrollLeft)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [target, setElement, setScrollLeft])

  const onMouseDown = (direction) => {
    const scrollDelta = Math.ceil(element.clientWidth * (3 / 4))
    $(element).animate({ scrollLeft: (scrollLeft + scrollDelta * direction) }, 500)
  }

  if (!element) {
    return null
  }
  return (
    <div>
      {scrollLeft > 0 && (
        <SideNavButton onMouseDown={() => onMouseDown(-1)} offsetTop={height / 2} />
      )}
      {scrollLeft < element.scrollWidth - element.clientWidth - 45 && (
        <SideNavButton onMouseDown={() => onMouseDown(1)} offsetTop={height / 2} rightIcon />
      )}
    </div>
  )
}

Scroller.propTypes = {
  target: PropTypes.string.isRequired,
  height: PropTypes.number,
}

export default Scroller
