
import '../../assets/scripts/perfect-scrollbar.jquery.js'

import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
var ReactDOM = require('react-dom')
import { CSSTransition, TransitionGroup } from 'react-transition-group'
var MediaQuery = require('react-responsive')

var maxShowcaseHeight = 805
var showcaseTitleHeight = 56
var scrollPadding = 80
var titleSectionWidthPercent = 0.85
var minBackgroundBlur = 0.3
var maxBackgroundBlur = 0.8

var EventEmitter = require('../../middleware/EventEmitter.js')
var ShowcaseTitleBar = require('./ShowcaseTitleBar.jsx')
var ShowcaseBackground = require('./ShowcaseBackground.jsx')
var AttentionHelp = require('../../other/AttentionHelp.jsx')
var ShowcaseInnerContent = require('./ShowcaseInnerContent.jsx')
var Scroller = require('../../other/Scroller.jsx')
var CollectionHomeButton  = require('./CollectionHomeButton.jsx')

const BrowserUtils = require('../../modules/BrowserUtils.jsx')
const LoadRemote = require('../../modules/LoadRemote.jsx')
const CollectionUrl = require('../../modules/CollectionUrl.jsx')

var ShowcaseShow = createReactClass({
  propTypes: {
    collection: PropTypes.object,
    showcase: PropTypes.object,
  },

  getInitialState: function() {
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

  componentDidUpdate: function(prevProps, prevState) {
    if (!this.scrollbarInitialized) {
      this.initializeScrollbar()
    }
    if(this.props !== prevProps) {
      this.initializeScrollbar()
      this.state.outerElement[0].scrollLeft = 0
    }
    if(this.state.hasScrolled !== prevState.hasScrolled) {
      this.updateScrollbar()
    }
  },

  initializeScrollbar: function() {
    this.scrollbarInitialized = true
    this.state.outerElement.perfectScrollbar({useBothWheelAxes: true, suppressScrollY: true })
    if(BrowserUtils.ie() || this.state.mobile) {
      this.state.outerElement.find(".ps-scrollbar-x-rail").hide()
    }
  },

  updateScrollbar: function() {
    if (this.scrollbarInitialized) {
      this.state.outerElement.perfectScrollbar("update")
      if(BrowserUtils.ie() || this.state.mobile) {
        this.state.outerElement.find(".ps-scrollbar-x-rail").hide()
      }
    }
  },

  handleResize: function() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      mobile: BrowserUtils.mobile(),
    })
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize, false)
    this.handleResize()
    this.setState({
      outerElement: $('#showcase-outer'),
      element: $(ReactDOM.findDOMNode(this)),
    })
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize)
    document.body.style.backgroundImage = null
  },

  styleOuter: function(height) {
    return {
      position: "relative",
      overflowY: "hidden",
      overflowX: "hidden",
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      height: height + "px",
      backgroundColor: 'rgba(0,0,0,0)'
    }
  },

  transparent: function() {
    return {
      backgroundColor:'transparent',
    }
  },

  componentWillMount: function(){
    document.body.className = document.body.className + " showcase-bg"
  },

  onScroll: function() {
    if(!this.state.hasScrolled) {
      this.setState({hasScrolled: true})
    }
    var scrollLeft = this.state.outerElement.get(0).scrollLeft
    var titleWidth = this.state.element.width() * titleSectionWidthPercent
    var percentVisible = 1 - scrollLeft/titleWidth
    if (percentVisible < 0) {
      percentVisible = 0
    } else {
      percentVisible = Math.round(percentVisible * 100) / 100
    }
    if (percentVisible != this.state.titleSectionPercentVisible) {
      this.setState({
        titleSectionPercentVisible: percentVisible,
      })
    }
  },

  render: function() {
    var showcaseHeight = this.state.height - showcaseTitleHeight
    if (showcaseHeight > maxShowcaseHeight) {
      showcaseHeight = maxShowcaseHeight
    }
    var showcaseInnerHeight = showcaseHeight - scrollPadding

    var scroller = (<Scroller target="#showcase-outer" height={showcaseHeight} />)
    var titleBar = (
      <ShowcaseTitleBar
        percentFade={this.state.titleSectionPercentVisible}
        height={showcaseTitleHeight}
        showcase={this.props.showcase}
      />
    )

    // overwrite some stuff for iOS. TODO: Android
    var mobileHomeButton
    if(this.state.mobile){
      showcaseHeight = this.state.height * 0.95
      showcaseInnerHeight = Math.floor(showcaseHeight * 0.95)
      scroller = null
      mobileHomeButton = (<CollectionHomeButton collection={this.props.collection}/>)
      showcaseHeight = this.state.height
    }
    if(this.state.mobile || this.state.height < 960){
      titleBar = null
    }

    // background stuff
    var backgroundBlur = 1 - this.state.titleSectionPercentVisible
    if (backgroundBlur < minBackgroundBlur) {
      backgroundBlur = minBackgroundBlur
    } else if (backgroundBlur > maxBackgroundBlur) {
      backgroundBlur = maxBackgroundBlur
    }

    return (
      <div style={{height: showcaseHeight, backgroundColor: 'rgba(0,0,0,0)'}}>
        <AttentionHelp start={this.state.startTime} hasScrolled={this.state.hasScrolled} />
        <ShowcaseBackground percentBlur={backgroundBlur} height={this.state.mobile ? this.state.height : this.state.height - scrollPadding} showcase={this.props.showcase} />
        {titleBar}
        <TransitionGroup className='showcase-slide-in'>
          <div id="showcase-outer" className="showcase-outer" style={this.styleOuter(showcaseHeight)} onScroll={this.onScroll}>
            {scroller}
            <ShowcaseInnerContent height={showcaseInnerHeight} showcase={this.props.showcase} />
          </div>
        </TransitionGroup>
        {mobileHomeButton}
      </div>
    )
  }
})

module.exports = ShowcaseShow
