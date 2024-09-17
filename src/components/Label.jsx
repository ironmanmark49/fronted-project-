import React from 'react'

const Label = ({children, className}) => {
  return (
   <>
   <label className={className}>{children}</label>
   </>
  )
}

export default Label