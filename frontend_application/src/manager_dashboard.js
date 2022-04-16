import React, { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import axios from './axios'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'

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
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // console.log(newValue)
    setValue(newValue)
  }

  useEffect(() => {
    async function fetchData () {
      // cuz base url already set up in axios.js
      const req = await axios.get('/universal_table/get_data')

      // whatever the request.data comes back us
      setData(req.data)
    }

    fetchData()
  }, [])

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
          <Tab label='Verified' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          {data
            .filter(item => item.status === 'Pending')
            .map(item => (
              <Accordion key={item.dataset_ID}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{item.dataset_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component = "span">
                    <div>Source: {item.source}</div>
                    <div>File Type: {item.file_type}</div>
                    <div>Version: {item.version}</div>
                    <div>Date: {item.date_time}</div>
                    <Button color='primary'>More Details</Button>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          {data
            .filter(item => item.status === 'Processing')
            .map(item => (
              <Accordion key={item.dataset_ID}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{item.dataset_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component = "span">
                    <div>Source: {item.source}</div>
                    <div>File Type: {item.file_type}</div>
                    <div>Version: {item.version}</div>
                    <div>Date: {item.date_time}</div>
                    <Button color='primary'>More Details</Button>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          {data
            .filter(item => item.status === 'APPROVED')
            .map(item => (
              <Accordion key={item.dataset_ID}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{item.dataset_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component = "span">
                    <div>Source: {item.source}</div>
                    <div>File Type: {item.file_type}</div>
                    <div>Version: {item.version}</div>
                    <div>Date: {item.date_time}</div>
                    <Button color='primary'>More Details</Button>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </TabPanel>
    </Box>
  )
}

export default Manager_Dashboard
