import { React, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from './axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'

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
  const navigate = useNavigate()

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
    fetchData()
  }, [code])

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
    if (source_data !== undefined) {
      var today = new Date()
      await axios
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
    await axios
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
    <div className='container my-5'>
      <div className='card border-primary mb-3'>
        {/* <div className="card-header">Header</div> */}
        <div className='card-body data-card text-secondary fs-5'>
          <p className='card-text'>
            <span className='fw-bold text-dark fs-5'>Dataset Name: </span>{' '}
            {data[0].dataset_name}
          </p>
          <p>
            <span className='fw-bold text-dark fs-5'>Dataset Source: </span>{' '}
            {data[0].dataset_source}
          </p>
          <p>
            <span className='fw-bold text-dark fs-5'>Dataset Version: </span>
            Dataset Version: {data[0].dataset_version}
          </p>
          <p>
            <span className='fw-bold text-dark fs-5'>
              Dataset Date-time of Upload:
            </span>{' '}
            {data[0].dataset_date}
          </p>
          <p>
            <span className='fw-bold text-dark fs-5'>Dataset Status: </span>
            {data[0].dataset_status}
          </p>
          <p>
            <span className='fw-bold text-dark fs-5'>
              Dataset Content Type:
            </span>{' '}
            {data[0].dataset_content_type}
          </p>
          <p>
            <span className='fw-bold text-dark fs-5'>Dataset Path: </span>
            {data[0].dataset_path}
          </p>
          <p>
            <span className='fw-bold text-dark fs-5'>Dataset Comment: </span>
            {data[0].dataset_comment}
          </p>

          {/* <button type="button" className="btn btn-info m-2">Info</button>
        <button type="button" className="btn btn-info m-2">Info</button>
        <button type="button" className="btn btn-info m-2">Info</button> */}

          <Button
            className='m-2'
            id='verify_btn'
            variant='outlined'
            disabled={verify_src_btn_is_disabled}
            onClick={() => verify_source()}
          >
            Verify Source
          </Button>
          <Button
            className='btn btn-primary m-2'
            id='divide_btn'
            variant='outlined'
            disabled={!verify_src_btn_is_disabled}
            onClick={handleDivideDataset(data[0].dataset_id)}
          >
            Divide Dataset
          </Button>

          <Button
            className='btn btn-info m-2'
            variant='outlined'
            onClick={handleOpen}
          >
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
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  )
}

export default Datasetinfo
