import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './header'
import Manager_Dashboard from './manager_dashboard'
import Login from './login'
import globalContext from './globalContext'

function App () {
  const [user, setUser] = useState({ name: '' })

  const setUserData = (username) => {
    console.log("Setting global context values now.")
    setUser(
      user.name = username
    ) 
    console.log("Value set as: "+user.name)
  }

  const userSettings = {
    username: user.name,
    setUserData
  }
  // console.log(user)

  return (
    <globalContext.Provider value={userSettings}>
      <Router>
        <div className='App'>
          <Header user={user} />
          {user.name === '' ? (
            <Login setUser={setUser} />
          ) : (
            //dashboard
            <Manager_Dashboard />
          )}
        </div>
      </Router>
    </globalContext.Provider>
  )
}

export default App
