import '../../assets/scripts/perfect-scrollbar.jquery.js'
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import JSONLD from '../JSONLD.jsx'
import RemoveMarkup from '../../modules/RemoveMarkup'
const ReactDOM = require('react-dom')
const maxShowcaseHeight = 805
const showcaseTitleHeight = 56
const scrollPadding = 80
const titleSectionWidthPercent = 0.85
const minBackgroundBlur = 0.3
const maxBackgroundBlur = 0.8
const ShowcaseTitleBar = require('./ShowcaseTitleBar.jsx')
const ShowcaseBackground = require('./ShowcaseBackground.jsx')
const AttentionHelp = require('../../other/AttentionHelp.jsx')
const ShowcaseInnerContent = require('./ShowcaseInnerContent.jsx')
const Scroller = require('../../other/Scroller.jsx')
const CollectionHomeButton = require('./CollectionHomeButton.jsx')
const BrowserUtils = require('../../modules/BrowserUtils.jsx')
const $ = require('jquery')

const ShowcaseShow = createReactClass({
  propTypes: {
    collection: PropTypes.object,
    showcase: PropTypes.object,
  },

  getInitialState: function () {
    return {
      titleSectionPercentVisible: 1,
      startTime: Date.now(),
      hasScrolled: false,
      outerElement: null,
      element: null,
      width: window.innerWidth,
      height: window.innerHeight,
      mobile: BrowserUtils.mobile(),
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (!this.scrollbarInitialized) {
      this.initializeScrollbar()
    }
    if (this.props !== prevProps) {
      this.initializeScrollbar()
      this.state.outerElement[0].scrollLeft = 0
    }
    if (this.state.hasScrolled !== prevState.hasScrolled) {
      this.updateScrollbar()
    }
  },

  initializeScrollbar: function () {
    this.scrollbarInitialized = true
    this.state.outerElement.perfectScrollbar({ useBothWheelAxes: true, suppressScrollY: true })
    if (BrowserUtils.ie() || this.state.mobile) {
      this.state.outerElement.find('.ps-scrollbar-x-rail').hide()
    }
  },

  updateScrollbar: function () {
    if (this.scrollbarInitialized) {
      this.state.outerElement.perfectScrollbar('update')
      if (BrowserUtils.ie() || this.state.mobile) {
        this.state.outerElement.find('.ps-scrollbar-x-rail').hide()
      }
    }
  },

  handleResize: function () {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      mobile: BrowserUtils.mobile(),
    })
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize, false)
    this.handleResize()
    this.setState({
      outerElement: $('#showcase-outer'),
      element: $(ReactDOM.findDOMNode(this)),
    })
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize)
    document.body.style.backgroundImage = null
  },

  styleOuter: function (height) {
    return {
      position: 'relative',
      overflowY: 'hidden',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      height: height + 'px',
      backgroundColor: 'rgba(0,0,0,0)',
    }
  },

  transparent: function () {
    return {
      backgroundColor:'transparent',
    }
  },

  componentWillMount: function () {
    document.body.className = document.body.className + ' showcase-bg'
  },

  onScroll: function () {
    if (!this.state.hasScrolled) {
      this.setState({ hasScrolled: true })
    }
    const scrollLeft = this.state.outerElement.get(0).scrollLeft
    const titleWidth = this.state.element.width() * titleSectionWidthPercent
    let percentVisible = 1 - scrollLeft / titleWidth
    if (percentVisible < 0) {
      percentVisible = 0
    } else {
      percentVisible = Math.round(percentVisible * 100) / 100
    }
    if (percentVisible !== this.state.titleSectionPercentVisible) {
      this.setState({
        titleSectionPercentVisible: percentVisible,
      })
    }
  },

  render: function () {
    let showcaseHeight = this.state.height - showcaseTitleHeight
    if (showcaseHeight > maxShowcaseHeight) {
      showcaseHeight = maxShowcaseHeight
    }
    let showcaseInnerHeight = showcaseHeight - scrollPadding

    let scroller = (<Scroller target='#showcase-outer' height={showcaseHeight} />)
    let titleBar = (
      <ShowcaseTitleBar
        percentFade={this.state.titleSectionPercentVisible}
        height={showcaseTitleHeight}
        showcase={this.props.showcase}
      />
    )

    // overwrite some stuff for iOS. TODO: Android
    let mobileHomeButton
    if (this.state.mobile) {
      showcaseHeight = this.state.height * 0.95
      showcaseInnerHeight = Math.floor(showcaseHeight * 0.95)
      scroller = null
      mobileHomeButton = (<CollectionHomeButton collection={this.props.collection} />)
      showcaseHeight = this.state.height
    }
    if (this.state.mobile || this.state.height < 960) {
      titleBar = null
    }

    // background stuff
    let backgroundBlur = 1 - this.state.titleSectionPercentVisible
    if (backgroundBlur < minBackgroundBlur) {
      backgroundBlur = minBackgroundBlur
    } else if (backgroundBlur > maxBackgroundBlur) {
      backgroundBlur = maxBackgroundBlur
    }
    const collection = this.props.collection
    const showcase = this.props.showcase

    let articleBody = ''
    for (let i = 0; i < showcase.sections.length; i++) {
      articleBody += RemoveMarkup(showcase.sections[i].description)
    }
    const dataUrl = `https://collections.library.nd.edu/${collection.id}/${collection.slug}/showcases/${showcase.id}/${showcase.slug}`

    let showcaseSafeImage
    if (showcase.image) {
      showcaseSafeImage = showcase.image.contentUrl
    } else {
      showcaseSafeImage = 'https://collections.library.nd.edu/images/intro.jpg'
    }

    const data = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': dataUrl,
      },
      headline: showcase.name,
      alternativeHeadline: showcase.name_line_1,
      image: showcaseSafeImage,
      genre: 'academic library collection',
      keywords: 'notre dame special collections digital exhibits library',
      author: {
        '@type': 'Organization',
        name: 'Hesburgh Library - University of Notre Dame',
      },
      publisher: {
        '@type': 'Organization',
        name: 'University of Notre Dame',
        logo: {
          '@type': 'ImageObject',
          url: 'https://onmessage.nd.edu/assets/185044/fullsize/1_university_mark.jpg',
        },
      },
      url: dataUrl,
      datePublished: showcase.last_updated,
      dateModified: showcase.last_updated,
      description: showcase.description,
      articleBody: articleBody,
    }
    return (
      <div style={{ height: showcaseHeight, backgroundColor: 'rgba(0,0,0,0)' }}>
        <AttentionHelp
          start={this.state.startTime}
          hasScrolled={this.state.hasScrolled}
        />
        <ShowcaseBackground
          percentBlur={backgroundBlur}
          height={this.state.mobile ? this.state.height : this.state.height - scrollPadding}
          showcase={showcase}
        />
        {titleBar}
        <div className='showcase-slide-in'>
          <div
            id='showcase-outer'
            className='showcase-outer'
            style={this.styleOuter(showcaseHeight)}
            onScroll={this.onScroll}
          >
            {scroller}
            <ShowcaseInnerContent
              height={showcaseInnerHeight}
              showcase={showcase}
            />
          </div>
        </div>
        {mobileHomeButton}
        <JSONLD data={data} />
      </div>
    )
  },
})

module.exports = ShowcaseShow
