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

function EmployeeDatasetinfo () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [data, setData] = useState([])
  const [searchParams] = useSearchParams()
  const [comment, setComment] = useState('')
  const [verified, setVerified] = useState(false)
  const code = searchParams.get('dataset_path')
  const navigate = useNavigate()

  async function fetchData () {
    const req = await axios.get('/universal_table/get_employee_work_info')
    setData(req.data.filter(item => item.emp_project_path_name === code))
  }

  useEffect(() => {
    fetchData()
  }, [code])

  useEffect(() => {
    // console.log(data)
    if (data.length > 0) {
      setVerified(Boolean(data[0].emp_project_status))
      //   console.log(verified)
    }
  }, [data])

  async function commentSubmit (e) {
    e.preventDefault()
    // console.log("Comment", comment)

    await axios
      .post('/universal_table/update_emp_proj_comment', {
        emp_comments: comment,
        emp_project_path_name: code
      })
      .then(response => {
        // console.log('Update of comment complete.')
        handleClose()
        fetchData()
      })

    await axios
      .post('/universal_table/update_dataset_details_comment', {
        emp_comments: comment,
        dataset_path_name: code
      })
      .then(response => {
        // console.log('Update of comment complete.')
        handleClose()
        fetchData()
      })
  }

  async function verify_dataset () {
    await axios
      .post('/universal_table/update_emp_proj_verification_status', {
        emp_project_status: 1,
        emp_project_path_name: code
      })
      .then(response => {
        // console.log('Verification status updated.')
        setVerified(1)
        navigate('/dashboard')
      })
  }

  return data.length > 0 ? (
    <div className='container my-5'>
      <div className='card border-primary mb-3'>
        {/* <div className="card-header">Header</div> */}
        <div className='card-body data-card text-secondary fs-5'>
          <p className='card-text'>
            <span className='fw-bold text-dark fs-5'>Dataset Path: </span>{' '}
            {data[0].emp_project_path_name}
          </p>
          <p>
            <span className='fw-bold text-dark fs-5'>Dataset Comment: </span>
            {data[0].emp_comments}
          </p>
          <Button
            className='m-2'
            id='verify_btn'
            variant='outlined'
            disabled={verified}
            onClick={() => verify_dataset()}
          >
            Verify Dataset
          </Button>
          <Button
            className='btn btn-info m-2'
            variant='outlined'
            onClick={handleOpen}
          >
            Send Feedback to Manager
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
    <div></div>
  )
}

export default EmployeeDatasetinfo
