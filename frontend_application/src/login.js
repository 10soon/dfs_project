import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import globalContext from './globalContext'
import axios from './axios'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px'
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2)
    }
  }
}))

const Login = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [empid, setEmpID] = useState('')
  // const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const myContext = useContext(globalContext)
  let navigate = useNavigate()

  const handleSubmit = e => {
    async function get_role () {
      const req = await axios.get('/universal_table/get_employee_info')
      setData(req.data)
    }
    e.preventDefault()
    // console.log("Empid entered: ", empid)
    myContext.setUserData(empid)
    get_role()
  }

  useEffect(() => {
    // console.log(data)
    // console.log(data.filter(item => item.emp_id === empid))
    if (data.length === 0 || data.filter(item => item.emp_id === empid).length === 0) {
      // console.log('Authentication failed')
    } else {
      // console.log('Authentication succesful.')
      // console.log(data.filter(item => item.emp_id === empid)[0].emp_role)
      myContext.setUserRole(
        data.filter(item => item.emp_id === empid)[0].emp_role
      )
      // console.log("role set: ", myContext.userrole)
      navigate('/dashboard')
    }
  }, [data, empid, myContext, navigate])

  return (
    <div className='card w-50 mx-auto my-4 shadow'>
      <h5 className='card-header'>Login Form</h5>
      <form className={classes.root} onSubmit={handleSubmit}>
        <div className='col-8 p-2'>
          <input
            type='text'
            className='form-control'
            placeholder='employee ID'
            variant='filled'
            value={empid}
            aria-label='Employee ID'
            onChange={e => setEmpID(e.target.value)}
            required
          />
        </div>
        <div className='col-8 p-2'>
          <input
            type='email'
            className='form-control'
            variant='filled'
            aria-label='email'
            value={email}
            placeholder='email'
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='col-8 p-2'>
          <input
            type='password'
            className='form-control'
            id='inputPassword4'
            variant='filled'
            value={password}
            placeholder='password'
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button
            type='submit'
            className='btn btn-info m-3 shadow'
            variant='contained'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
