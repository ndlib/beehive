import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import { withRouter } from 'react-router-dom'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-2118378-44')

class Analytics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: null,
    }
  }

  logPageView (location) {
    if (location) {
      if (location.search === '') {
        ReactGA.pageview(location.pathname)
      } else {
        ReactGA.pageview(location.pathname + '/' + location.search)
      }
    }
  }

  componentDidMount () {
    this.logPageView(this.props.history.location)
    this.setState({ location: this.props.history.location })
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.location) {
      // if pathname and/or search properties of location change - fire tracking
      if ((this.state.location.pathname !== nextProps.history.location.pathname) || (this.state.location.search !== nextProps.history.location.search)) {
        this.logPageView(nextProps.history.location)
        this.setState({ location: nextProps.history.location })
      }
    }
  }

  render () {
    return (<div>{this.props.children}</div>)
  }
}

export default withRouter(Analytics)
