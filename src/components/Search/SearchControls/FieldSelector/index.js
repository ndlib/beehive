import React from 'react'

import StyledDropdown from 'components/Shared/StyledDropdown'

import SearchActions from 'actions/SearchActions'
import SearchStore from 'store/SearchStore'
import ConfigurationStore from 'store/ConfigurationStore'

const FieldSelector = () => {
  const options = [
    { name: 'all', label: 'All Fields' },
  ].concat(
    // Get values for dropdown. Sort in the order specified in Honeycomb and filter out fields that should be
    // excluded because fieldSearch === false.
    Object.values(ConfigurationStore.fields)
      .filter(field => field.active !== false && field.fieldSearch !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map((field) => ({
        name: field.name + (field.type === 'date' ? '_dt' : '_t'),
        label: field.label,
      })),
  )
  return (
    <StyledDropdown
      storeValue={SearchStore.field}
      defaultValue='all'
      queryParamName='field'
      setStore={SearchActions.setField}
      options={options}
    />
  )
}

export default FieldSelector
