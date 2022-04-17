import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './header'
import Manager_Dashboard from './manager_dashboard'
import Employee_Dashboard from './employee_dashboard'
import Home from './home'
import Login from './login'
import globalContext from './globalContext'
import DatasetInfo from './datasetinfo'

function App () {
  const [user, setUser] = useState('')
  const [role, setRole] = useState(0)
  const [datasetID, setDatasetID] = useState('')

  const setUserData = (username) => {
    // console.log("Setting global context values now.")
    setUser(username);
    // console.log("Value set as: "+user)
  }

  const setDatasetIDfunc = (datasetID) => {
    setDatasetID(datasetID);
  }

  const setUserRole = (userrole) => {
    setRole(userrole);
  }

  const userSettings = {
    username: user,
    userrole: role,
    dataset_ID: datasetID,
    setUserData,
    setUserRole,
    setDatasetIDfunc
  }
  // console.log(user)

  return (
    <globalContext.Provider value={userSettings}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ role === 0 ? <Manager_Dashboard /> : <Employee_Dashboard />} />
        <Route path="/dashboard/datasetinfo" element={<DatasetInfo/>} />
        <Route path="*" element={<div> Error 404. Page not found. </div>} />
      </Routes>
    </globalContext.Provider>
  )
}

export default App
