import { React, useState, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from './axios'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function Datasetinfo () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [data, setData] = useState([])
  const [source_data, setSourceData] = useState([])
  const [verify_src_btn_is_disabled, setSrcBtn] = useState(false)
  const [searchParams] = useSearchParams()
  const [comment, setComment] = useState('')
  const code = searchParams.get('datasetID')
  const navigate = useNavigate();

  const handleDivideDataset = datasetID => () => {
    console.log(datasetID)
    // myContext.setDatasetIDfunc(datasetID)
    const path = '/dashboard/dividedataset?datasetID=' + datasetID.toString()
    navigate(path)
  }
  
  async function fetchData () {
    const req = await axios.get('/universal_table/get_data')
    setData(req.data.filter(item => item.dataset_id === code))
  }

  useEffect(() => {
    async function fetchData () {
      const req = await axios.get('/universal_table/get_data')
      setData(req.data.filter(item => item.dataset_id === code))
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchSource () {
      const req = await axios.get('/universal_table/get_source_data')
      if (data.length > 0) {
        setSourceData(
          req.data.filter(
            item => item.source_id === data[0].dataset_source_id
          )[0]
        )
      }
    }
    fetchSource()
  }, [data])

  useEffect(() => {
    async function update_source () {
      var source_date = new Date(source_data.date_verified)
      var today = new Date()
      var diffTime = Math.abs(today - source_date)
      var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      // console.log(source_data)
      // console.log("Date diff in days: ", diffDays)

      if (diffDays > 7) {
        setSrcBtn(false)
      } else {
        setSrcBtn(true)
      }
    }

    update_source()
  }, [source_data])

  async function verify_source () {
    if (source_data != undefined) {
      var today = new Date()

      const response = await axios
        .post('/universal_table/update_source_data', {
          source_id: source_data.source_id,
          date_verified: today
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')
        })
        .then(response => {
          console.log('Update complete')
          setSrcBtn(true)
        })
    }
  }

  async function commentSubmit (e) {
    e.preventDefault()
    // console.log("Comment", comment)
    // console.log(data[0].dataset_id)
    const response = await axios
      .post('/universal_table/update_comments_data', {
        dataset_id: data[0].dataset_id,
        dataset_comment: comment
      })
      .then(response => {
        console.log('Update of comments complete')
        handleClose()
        fetchData()
      })
  }

  return data.length > 0 ? (
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
      <Typography>
        Dataset Date-time of Upload: {data[0].dataset_date}
      </Typography>
      <Divider />
      <Typography>Dataset Status: {data[0].dataset_status}</Typography>
      <Divider />
      <Typography>
        Dataset Content Type: {data[0].dataset_content_type}
      </Typography>
      <Divider />
      <Typography>Dataset Path: {data[0].dataset_path}</Typography>
      <Divider />
      <Typography>Dataset Comment: {data[0].dataset_comment}</Typography>
      <Divider />
      <Stack spacing={2} direction='row'>
        <Button
          id='verify_btn'
          variant='outlined'
          disabled={verify_src_btn_is_disabled}
          onClick={() => verify_source()}
        >
          Verify Source
        </Button>
        <Button
          id='divide_btn'
          variant='outlined'
          disabled={!verify_src_btn_is_disabled}
          onClick={handleDivideDataset(data[0].dataset_id)}
        >
          Divide Dataset
        </Button>
        <Button variant='outlined' onClick={handleOpen}>
          Send Source Feedback
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <form onSubmit={commentSubmit}>
              <TextField
                fullWidth
                id='outlined-multiline-static'
                label='Enter comments'
                multiline
                rows={10}
                variant='outlined'
                value={comment}
                onInput={e => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant='outlined' type='submit'>
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </Stack>
    </Box>
  ) : (
    <div></div>
  )
}

export default Datasetinfo
