import React from 'react'
import createReactClass from 'create-react-class'
import SearchActions from '../../actions/SearchActions.js'
import SearchStore from '../../store/SearchStore.js'

const SearchSort = createReactClass({
  getInitialState: function () {
    const state = {
      selectValue: 0,
    }
    return state
  },

  onChange: function (prop, e) {
    this.setSort(e.target.value)
  },

  setSort: function (sortOption) {
    SearchActions.setSort(sortOption)
  },

  sortStyle: function () {
    return ({
      display:'inline-block',
      borderRadius: '2px',
      overflow: 'hidden',
      width:'120px',
      verticalAlign: 'middle',
      marginLeft: '5px',
      background: 'url(/images/arrowdown.gif) no-repeat 90% 50% #fff',
    })
  },

  sortSelectStyle: function () {
    return ({
      background: 'transparent',
      padding: '7px 8px',
      border: 'none',
      boxShadow: 'none',
      appearance: 'none',
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      width: '130%',
      color: 'black',
    })
  },

  sortOptions: function () {
    return SearchStore.sorts.map(function (option) {
      return (<option key={option.value} value={option.value}>{option.name}</option>)
    })
  },

  render: function () {
    if (SearchStore.sorts.length > 0) {
      return (
        <div style={{ float: 'left', padding: '10px', paddingTop: '15px', color: 'white', fontSize: '16px' }}>
          Sort By:
          <div style={this.sortStyle()}>
            <select
              ref='searchSort'
              onChange={() => {
                this.onChange('selectValue')
              }}
              defaultValue={SearchStore.sortOption}
              style={this.sortSelectStyle()}
            >
              {this.sortOptions()}
            </select>
          </div>
        </div>
      )
    } else {
      return null
    }
  },
})
export default SearchSort
