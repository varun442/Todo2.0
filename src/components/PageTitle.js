import React from 'react'
import '../App.css'
const PageTitle = ({children, ...rest}) => {
  return (
    <p className="title" {...rest}>{children}</p>
  )
}

export default PageTitle