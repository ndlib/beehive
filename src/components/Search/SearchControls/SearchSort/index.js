import React from 'react'

import StyledDropdown from 'components/Shared/StyledDropdown'

import SearchActions from 'actions/SearchActions'
import SearchStore from 'store/SearchStore'

const SearchSort = () => {
  if (SearchStore.sorts.length <= 0) {
    return null
  }

  const sortOptions = (a, b) => {
    return (a.order || 0) - (b.order || 0)
  }

  const options = SearchStore.sorts.sort(sortOptions).map(sort => ({
    name: sort.value,
    label: sort.name,
  }))
  return (
    <StyledDropdown
      label='Sort By'
      storeValue={SearchStore.sortOption}
      defaultValue={SearchStore.sorts[0].value}
      queryParamName='sort'
      setStore={SearchActions.setSort}
      options={options}
    />
  )
}

export default SearchSort
