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

function DatasetProcessing () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [data, setData] = useState([])
  const [verify_btn_is_disabled, setSrcBtn] = useState(true)
  const [searchParams] = useSearchParams()
  const [comment, setComment] = useState('')
  // const [source_data, setSourceData] = useState([])
  const [v_status, setVStatus] = useState(0)
  const [v_total, setVTotal] = useState(0)
  const code = searchParams.get('datasetID')
  const navigate = useNavigate()

  async function fetchData () {
    const req = await axios.get('/universal_table/get_data')
    const req1 = await axios.post('universal_table/get_v_total', {
        data_id: code,
    })
    const req2 = await axios.post('/universal_table/get_v_status', {
        data_id: code,
    })

    setData(req.data.filter(item => item.dataset_id === code))
    setVTotal(req1.data[0].ret)
    setVStatus(req2.data[0].ret)

    if (v_total === v_status)
        setSrcBtn(true)
    else
        setSrcBtn(false)
  }

  useEffect(() => {
    fetchData()
  }, [code])

  // useEffect(() => {
  //   async function fetchSource () {
  //     const req = await axios.get('/universal_table/get_source_data')
  //     if (data.length > 0) {
  //       setSourceData(
  //         req.data.filter(
  //           item => item.source_id === data[0].dataset_source_id
  //         )[0]
  //       )
  //     }
  //   }
  //   fetchSource()
  // }, [data])

  async function verify () {
    if (v_status === v_total) {
      const req3 = await axios.post('/universal_table/update_dataset_status_accept', {
          source_id: code
        })
    }
    navigate("/dashboard")
  }

  async function reject () {
    const req3 = await axios.post('/universal_table/update_dataset_status_reject', {
        source_id: code 
    })
    navigate("/dashboard")
  }

  async function commentSubmit (e) {
    e.preventDefault()
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
            <span className='fw-bold text-dark fs-5'>Dataset Divisions Verified: </span>
            {v_status}/{v_total}
          </p>
          <p>
            <span className='fw-bold text-dark fs-5'>Dataset Comment: </span>
            {data[0].dataset_comment}
          </p>

          <Button
            className='m-2'
            id='verify_btn'
            variant='outlined'
            disabled={verify_btn_is_disabled}
            onClick={() => verify()}
          >
            Accept
          </Button>

          <Button
            className='m-2'
            id='verify_btn'
            variant='outlined'
            onClick={() => reject()}
          >
            Reject
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

export default DatasetProcessing
