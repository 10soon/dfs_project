import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import globalContext from "./globalContext"
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
  // create state variables for each input
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const myContext = useContext(globalContext);
  let navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault()
    // console.log("After login submit")
    // console.log(firstName, lastName, email, password)
    myContext.setUserData(firstName)
    navigate("/dashbaord")
    // console.log("after setting global variable. Value: "+ (myContext.username))
    // setUser(firstName)
  }


  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label='First Name'
        variant='filled'
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label='Last Name'
        variant='filled'
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        label='Email'
        variant='filled'
        type='email'
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label='Password'
        variant='filled'
        type='password'
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div>
        <Button type='submit' variant='contained' color='primary'>
          Login
        </Button>
      </div>
    </form>
  )
}

export default Login