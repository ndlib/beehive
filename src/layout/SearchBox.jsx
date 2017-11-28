
import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { FontIcon, IconButton, RaisedButton } from 'material-ui'

var SearchStore = require('../store/SearchStore.js')
var SearchActions = require('../actions/SearchActions.js')

const CurrentTheme = require('../modules/CurrentTheme.jsx')

var Styles = {
  searchTextField: {
    height: '38px',
    width: '500px',
    verticalAlign:'top',
    paddingRight: '50px',
  },
  clearButton: {
    marginLeft: '-41px',
    height: '25px',
    width: '40px',
    verticalAlign: 'text-bottom',
    fontSize: '16px',
    paddingTop: '6px',
  },
}

var SearchBox = createReactClass({
  propTypes: {
    collection: PropTypes.object,
    primary: PropTypes.bool,
    useStore: PropTypes.bool,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  getDefaultProps: function () {
    return {
      primary: true,
      active: false,
      useStore: true,
    }
  },

  getInitialState: function () {
    var state = {
      active: this.props.active,
    }
    return state
  },

  onChange: function (e) {
    this.setTerm(e.target.value)
  },

  onClick: function (e) {
    if (this.state.active && this.state.searchTerm) {
      this.setSearchTerm(this.state.searchTerm)
    } else if (this.state.active) {
      this.setState({ active: false })
    } else {
      this.setState({ active: true })
    }
  },

  clearClick: function () {
    this.setSearchTerm('')
  },

  setSearchTerm (searchTerm) {
    this.setTerm(searchTerm)

    if (this.props.useStore) {
      SearchActions.setSearchTerm(searchTerm)
    } else {
      var url = window.location.origin +
        '/' + this.props.collection.id +
        '/' + this.props.collection.slug +
        '/search?q=' + searchTerm
      window.location = url
    }
  },

  componentDidMount: function () {
    this.setTerm(SearchStore.searchTerm)
  },

  setTerm: function (term) {
    this.setState({ searchTerm: term })
  },

  inputStyle: function () {
    return ({
      color: (this.props.primary ? CurrentTheme.getCurrentPallette(this.context.muiTheme).alternateTextColor : CurrentTheme.getCurrentPallette(this.context.muiTheme).textColor),
      height: '36px',
    })
  },

  clearButton: function () {
    if (SearchStore.searchTerm && this.state.active) {
      return (
        <IconButton onClick={this.clearClick} style={Styles.clearButton} tooltip='Clear Search'>
          <FontIcon color='gray' className='material-icons'>clear</FontIcon>
        </IconButton>
      )
    } else {

    }
  },

  handleKeyDown: function (e) {
    var ENTER = 13
    if (e.keyCode == ENTER) {
      this.onClick(e)
    }
  },

  input: function () {
    if (this.state.active) {
      return (<input
        placeholder='search'
        ref='searchBox'
        onChange={this.onChange}
        value={this.state.searchTerm}
        onKeyDown={this.handleKeyDown}
        style={Styles.searchTextField}
      />)
    } else {
      return (<div />)
    }
  },

  render: function () {
    return (
      <div style={{ display:'inline-block', margin:'14px 0' }}>
        {this.input()}
        {this.clearButton()}
        <RaisedButton
          backgroundColor='rgba(0, 0, 0, 0.641176)'
          onClick={this.onClick}
          style={{ zIndex: '0', minWidth: 'auto', boxShadow: 'none', lineHeight: '36px', width: '50px', height: '38px' }}
          disableTouchRipple
        >
          <FontIcon className='material-icons' style={CurrentTheme.lightIconStyle()}>search</FontIcon>
        </RaisedButton>
      </div>
    )
  },
})
module.exports = SearchBox
