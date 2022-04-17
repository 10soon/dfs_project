import { React, useContext, useEffect } from 'react'
import globalContext from './globalContext'
import { useNavigate } from 'react-router-dom'

function Home () {
  let navigate = useNavigate()

  const myContext = useContext(globalContext)

  useEffect(() => {
    if (myContext.username === "") {
      navigate('/login')
    } else {
      navigate('/dashboard')
    }
  }, [])

  return (
    <div className='Home'>
      {myContext.username === '' ? navigate('/login') : navigate('/dashboard')}
    </div>
  )
}

export default Home