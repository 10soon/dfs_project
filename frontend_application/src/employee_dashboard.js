import React, { useState, useContext, useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import axios from './axios'
import {useNavigate} from 'react-router-dom'
import globalContext from './globalContext'

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

function Employee_Dashboard () {
  const [data, setData] = useState([])
  const [value, setValue] = useState(0)
  const myContext = useContext(globalContext)
  let navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // console.log(newValue)
    setValue(newValue)
  }

  const handleMoreDetails = path_name => () => {
    // console.log(path_name)
    myContext.setDatasetPath(path_name)
    const path = '/dashboard/employeedatasetinfo?dataset_path=' + path_name
    navigate(path)
  }

  useEffect(() => {
    async function fetchData () {
      // cuz base url already set up in axios.js
      const req = await axios.get('/universal_table/get_employee_work_info')

      // whatever the request.data comes back us
      setData(req.data.filter(item => item.emp_id === myContext.username))
    }

    fetchData()
  }, [myContext.username])

  function get_file_name(path) {
    var file_type = "xlsx"
    var temp1 = path.split("."+file_type)

    if(file_type === "xlsx") {
      temp1 = temp1[0].split("/").slice(-1) + "-" + temp1[1].split("=")[1]
    } else {
      temp1 = temp1[0].split("/").slice(-1)
    }
    return temp1
  }

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
          <Tab label='Verified' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <div className="container d-flex flex-row flex-wrap">
          {data
            .filter(item => item.emp_project_status === 0)
            .map(item => (
                <div className="card text-white bg-secondary m-3" key={item.emp_project_path_name}>
                <div className="card-header fs-4 bg-grey fw-bold">{get_file_name(item.emp_project_path_name)}</div>
                <div className="card-body fs-15">
                  {/* <h5 className="card-title fs-10">Source: {item.dataset_source}</h5> */}
                  {/* <p className="card-text">
                  Source: {item.dataset_source}
                  </p>
                  <p>File Type: {item.dataset_content_type}
                  <br></br>
                  Version: {item.dataset_version}
                  <br></br>
                  Date: {item.dataset_date}</p> */}

                  <button
                      className="btn btn-info"
                      onClick={handleMoreDetails(item.emp_project_path_name)}
                    >
                      More Details
                    </button>
                </div>
              </div>
            ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="container d-flex flex-row flex-wrap">
          {data
            .filter(item => item.emp_project_status === 1)
            .map(item => (
              <div className="card text-white bg-secondary m-3" key={item.emp_project_path_name}>
                <div className="card-header fs-4 bg-grey fw-bold">{get_file_name(item.emp_project_path_name)}</div>
                <div className="card-body fs-15">
                  {/* <h5 className="card-title fs-10">Source: {item.dataset_source}</h5> */}
                  {/* <p className="card-text">
                  Source: {item.dataset_source}
                  </p>
                  <p>File Type: {item.dataset_content_type}
                  <br></br>
                  Version: {item.dataset_version}
                  <br></br>
                  Date: {item.dataset_date}</p> */}

                  <button
                      className="btn btn-info"
                      onClick={handleMoreDetails(item.emp_project_path_name)}
                    >
                      More Details
                    </button>
                </div>
              </div>
            ))}
        </div>
      </TabPanel>
    </Box>
  )
}

export default Employee_Dashboard;
