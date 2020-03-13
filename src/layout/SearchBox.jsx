import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import { IconButton, Button } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
const SearchStore = require('../store/SearchStore.js')
const SearchActions = require('../actions/SearchActions.js')
const CurrentTheme = require('../modules/CurrentTheme.jsx')

const Styles = {
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

const SearchBox = createReactClass({
  propTypes: {
    collection: PropTypes.object,
    primary: PropTypes.bool,
    useStore: PropTypes.bool,
    active: PropTypes.bool,
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
    const state = {
      active: this.props.active,
      lastSearched: '',
    }
    return state
  },

  onChange: function (e) {
    this.setTerm(e.target.value)
  },

  onClick: function (e) {
    if (this.state.active) {
      if (this.state.searchTerm !== this.state.lastSearched) {
        this.setSearchTerm(this.state.searchTerm)
      } else if (!this.state.searchTerm) {
        this.setState({ active: false })
      }
    } else {
      this.setState({ active: true })
    }
  },

  clearClick: function () {
    this.setSearchTerm('')
  },

  setSearchTerm (searchTerm) {
    this.setTerm(searchTerm)
    this.setState({ lastSearched: searchTerm })

    if (this.props.useStore) {
      SearchActions.setSearchTerm(searchTerm)
    } else {
      const url = window.location.origin +
        '/' + this.props.collection.id +
        '/' + this.props.collection.slug +
        '/search?q=' + searchTerm
      window.location = url
    }
  },

  componentDidMount: function () {
    this.setTerm(SearchStore.searchTerm)
    this.setState({ lastSearched: SearchStore.searchTerm })
  },

  setTerm: function (term) {
    this.setState({ searchTerm: term })
  },

  inputStyle: function () {
    return ({
      color: (this.props.primary ? '#ffffff' : '#212121'),
      height: '36px',
    })
  },

  clearButton: function () {
    if (SearchStore.searchTerm && this.state.active) {
      return (
        <IconButton onClick={this.clearClick} style={Styles.clearButton} tooltip='Clear Search'>
          <ClearIcon className='material-icons' style={{ color: 'gray' }} />
        </IconButton>
      )
    } else {

    }
  },

  handleKeyDown: function (e) {
    const ENTER = 13
    if (e.keyCode === ENTER) {
      this.onClick(e)
    }
  },

  input: function () {
    if (this.state.active) {
      return (
        <input
          placeholder='search'
          ref='searchBox'
          onChange={this.onChange}
          value={this.state.searchTerm}
          onKeyDown={this.handleKeyDown}
          style={Styles.searchTextField}
        />
      )
    } else {
      return (<div />)
    }
  },

  render: function () {
    return (
      <div style={{ display:'inline-block', margin:'14px 0' }}>
        {this.input()}
        {this.clearButton()}
        <Button
          variant='contained'
          backgroundColor='rgba(0, 0, 0, 0.641176)'
          onClick={this.onClick}
          style={{
            zIndex: '0',
            minWidth: 'auto',
            boxShadow: 'none',
            lineHeight: '36px',
            width: '50px',
            height: '38px',
          }}
          disableRipple
        >
          <SearchIcon className='material-icons' style={CurrentTheme.lightIconStyle()} />
        </Button>
      </div>
    )
  },
})

export default SearchBox
