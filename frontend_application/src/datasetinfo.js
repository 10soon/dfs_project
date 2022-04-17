import { React, useState, useContext, useEffect } from 'react'
import globalContext from './globalContext'
import { useNavigate } from 'react-router-dom'
import axios from './axios'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

function get_name(data) {
    // return data[0].dataset_name
}

function Datasetinfo () {
  const [data, setData] = useState([])
  const myContext = useContext(globalContext)

  useEffect(() => {
    async function fetchData () {
      // cuz base url already set up in axios.js
      const req = await axios.get('/universal_table/get_data')

      // whatever the request.data comes back us
      setData(req.data.filter(item => item.dataset_ID === myContext.dataset_ID)) 
      
    }

    fetchData()
  }, [])


  return (
    <Box
      sx={{
        flexGrow: 1,
        borderTop: 10,
        borderBottom: 10,
        borderLeft: 10,
        borderRight: 10,
        borderColor: 'white'
      }}
    >
      <Typography>Dataset Name: {get_name(data)}</Typography>
      <Divider />
    </Box>
  )
}

export default Datasetinfo
