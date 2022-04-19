import { React, useState, useContext, useEffect } from 'react'
// import globalContext from './globalContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from './axios'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

function Datasetinfo () {
  const [data, setData] = useState([])
  const [searchParams] = useSearchParams();
  const code = searchParams.get('datasetID');

  useEffect(() => {
    async function fetchData () {
      const req = await axios.get('/universal_table/get_data')
      setData(req.data.filter(item => item.dataset_id === code)) 
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
      <Typography>Dataset Name: {data[0].dataset_name}</Typography>
      <Divider />
      <Typography>Dataset Source: {data[0].dataset_source}</Typography>
      <Divider />
      <Typography>Dataset Version: {data[0].dataset_version}</Typography>
      <Divider />
      <Typography>Dataset Date-time of Upload: {data[0].dataset_date}</Typography>
      <Divider />
      <Typography>Dataset Status: {data[0].dataset_status}</Typography>
      <Divider />
      <Typography>Dataset Content Type: {data[0].dataset_content_type}</Typography>
      <Divider />
      <Typography>Dataset Path: {data[0].dataset_path}</Typography>
      <Divider />
      <Typography>Dataset Comment: {data[0].dataset_comment}</Typography>
      <Divider />
      <Stack spacing={2} direction="row">
      <Button variant="outlined">Verify Source</Button>
        <Button variant="outlined">Divide Dataset</Button>
        <Button variant="outlined">Send Source Feedback</Button>
      </Stack>
    </Box>
  )
}

export default Datasetinfo
