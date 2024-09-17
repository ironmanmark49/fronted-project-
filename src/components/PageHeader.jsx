import React from 'react'

const PageHeader = ({children}) => {
  return (
     <div className="page-header">
        <h3 className="page-title">{children}</h3>
      </div>
  )
}

export default PageHeader