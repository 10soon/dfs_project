import React, { useState, useContext, useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import axios from './axios'
import { useNavigate } from 'react-router-dom'
import globalContext from './globalContext'
import './index.css'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel (props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps (index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function Manager_Dashboard () {
  const [data, setData] = useState([])
  const [source_id_arr, setSourceID] = useState(new Set())
  const [source_data, setSourceData] = useState([])
  const [value, setValue] = useState(0)
  let navigate = useNavigate()
  const myContext = useContext(globalContext)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleMoreDetails = datasetID => () => {
    // console.log(datasetID)
    myContext.setDatasetIDfunc(datasetID)
    const path = '/dashboard/datasetinfo?datasetID=' + datasetID.toString()
    navigate(path)
  }

  const handleMoreDetails2 = datasetID => () => {
    // console.log(datasetID)
    myContext.setDatasetIDfunc(datasetID)
    const path = '/dashboard/datasetprocessing?datasetID=' + datasetID.toString()
    navigate(path)
  }

  useEffect(() => {
    async function fetchData () {
      // cuz base url already set up in axios.js
      const req = await axios.get('/universal_table/get_data')
      // console.log("Before setting", req.data)
      // whatever the request.data comes back us
      setData(req.data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    // console.log("Data refreshed")
    // console.log(data)
    setSourceID(new Set(data.map(x => x.dataset_source_id)))
  }, [data])

  useEffect(() => {
    async function fetchSource () {
      const req = await axios.get('/universal_table/get_source_data')
      setSourceData(req.data)
    }
    fetchSource()
  }, [source_id_arr])

  useEffect(() => {
    async function add_source_data () {
      // console.log("source id arr\n", source_id_arr)
      var table_source_ids = source_data.map(x => x.source_id)
      // console.log("table source ids\n", table_source_ids)
      for (let id of source_id_arr) {
        // console.log("Iterating for", id)
        if (!table_source_ids.includes(id)) {
          // console.log(id, 'not in table. Inserting')
          await axios
            .post('/universal_table/set_source_data', {
              source_id: id,
              date_verified: '2000-10-10 10:10:10'
            })
            .then(response => {
              // console.log('Insertion for ', id, 'complete')
              // console.log(response.data)
            })
        }
      }
    }
    add_source_data()
  }, [source_id_arr, source_data])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='To Be Verified' {...a11yProps(0)} />
          <Tab label='In Process of Verification' {...a11yProps(1)} />
          <Tab label='Processed' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='container d-flex flex-row flex-wrap'>
          {data
            .filter(item => item.dataset_status === 'pending')
            .map(item => (
              
              <div
                className='card text-white bg-secondary m-3'
                key={item.dataset_id}
              >
                <div className='card-header fs-4 bg-grey fw-bold'>
                  {item.dataset_name}
                </div>
                <div className='card-body fs-15'>
                  {/* <h5 className="card-title fs-10">Source: {item.dataset_source}</h5> */}
                  <p className='card-text'>Source: {item.dataset_source}</p>
                  <p>
                    File Type: {item.dataset_content_type.toUpperCase()}
                    <br></br>
                    Version: {item.dataset_version}
                    <br></br>
                    Date: {item.dataset_date}
                  </p>

                  <button
                    className='btn btn-info'
                    onClick={handleMoreDetails(item.dataset_id)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='container d-flex flex-row flex-wrap'>
          {data
            .filter(item => item.dataset_status === 'processing')
            .map(item => (
              <div
                className='card text-white bg-secondary m-3'
                key={item.dataset_id}
              >
                <div className='card-header fs-4 bg-grey fw-bold'>
                  {item.dataset_name}
                </div>
                <div className='card-body fs-15'>
                  {/* <h5 className="card-title fs-10">Source: {item.dataset_source}</h5> */}
                  <p className='card-text'>Source: {item.dataset_source}</p>
                  <p>
                    File Type: {item.dataset_content_type.toUpperCase()}
                    <br></br>
                    Version: {item.dataset_version}
                    <br></br>
                    Date: {item.dataset_date}
                  </p>

                  <button
                    className='btn btn-info'
                    onClick={handleMoreDetails2(item.dataset_id)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className='container d-flex flex-row flex-wrap'>
          {data
            .filter(item => item.dataset_status === 'approved' || item.dataset_status === 'rejected')
            .map(item => (
              <div
                className='card text-white bg-secondary m-3'
                key={item.dataset_id}
              >
                <div className='card-header fs-4 bg-grey fw-bold'>
                  {item.dataset_name}
                </div>
                <div className='card-body fs-15'>
                  {/* <h5 className="card-title fs-10">Source: {item.dataset_source}</h5> */}
                  <p className='card-text'>Source: {item.dataset_source}</p>
                  <p>
                    File Type: {item.dataset_content_type.toUpperCase()}
                    <br></br>
                    Version: {item.dataset_version}
                    <br></br>
                    Date: {item.dataset_date}
                    <br></br>
                    Status: {item.dataset_status.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </TabPanel>
    </Box>
  )
}

export default Manager_Dashboard
