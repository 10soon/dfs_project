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
    navigate("/dashboard")
    // console.log("after setting global variable. Value: "+ (myContext.username))
    // setUser(firstName)
  }


  return (
    <div className="card w-50 mx-auto my-4 shadow">
      <h5 className="card-header">Login Form</h5>
    <form className={classes.root} onSubmit={handleSubmit}>
      {/* <TextField
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      /> */}
      {/* <div className="row g-3"> */}
      <div className="col-8 p-2">
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          variant="filled"
          value={firstName}
          aria-label="First name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="col-8 p-2">
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          variant="filled"
          aria-label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      {/* </div> */}
      {/* <TextField
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      /> */}
      {/* <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /> */}
      <div className="col-8 p-2">
        <input
          type="email"
          className="form-control"
          variant="filled"
          aria-label="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {/* <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /> */}
      <div className="col-8 p-2">
      <input
        type="password"
        className="form-control"
        id="inputPassword4"
        variant="filled"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      </div>
      <div>
        {/* <Button type="submit" className="btn btn-info" variant="contained" color="primary">
          Login
        </Button> */}
        <button type="submit" class="btn btn-info m-3 shadow" variant="contained" >Login</button>
      </div>
      
    </form>
    </div>
  );
}

export default Login