import { React, useContext } from 'react'
import globalContext from './globalContext'

function Header () {
  const myContext = useContext(globalContext)

  return (
    <nav className='navbar navbar-dark bg-dark py-3'>
      <div className='container'>
        <div className='navbar-brand'>
          Data Foundation Systems: Dataset Entry Verification Workflow
        </div>
        <a className='navbar-brand' href='#'>Welcome {myContext.username}</a>
      </div>
    </nav>
  )
}

export default Header
