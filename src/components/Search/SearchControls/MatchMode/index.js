import React from 'react'

import StyledDropdown from 'components/Shared/StyledDropdown'

import SearchActions from 'actions/SearchActions'
import SearchStore from 'store/SearchStore'

const MatchMode = () => {
  const options = [
    { name: 'contains', label: 'Contains' },
    { name: 'exact', label: 'Exact' },
  ]

  return (
    <StyledDropdown
      storeValue={SearchStore.matchMode}
      defaultValue='contains'
      queryParamName='mode'
      setStore={SearchActions.setMatchMode}
      options={options}
    />
  )
}

export default MatchMode
