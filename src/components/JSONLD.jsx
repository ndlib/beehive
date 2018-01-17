import React from 'react'

const JSONLD = ({ data }) => {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default JSONLD
