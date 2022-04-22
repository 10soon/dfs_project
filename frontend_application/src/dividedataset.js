import { React, useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from './axios'
import 'react-folder-tree/dist/style.css'
import FolderTree, { testData } from 'react-folder-tree'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  width: '100%',
  //   height: '100%',
  //   textAlign: 'center',
  color: theme.palette.text.secondary
}))

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1)
}))

// const addUrl = node => {
//     const fakeUrl = `root/${node.name}`;
//   if (node.children) {
//     node.url = fakeUrl;
//     node.children = node.children.map(c => addUrl(c));
//   } else {
//     node.url = fakeUrl;
//   }

//   return node;
//   };

function DivideDataset () {
  const [data, setData] = useState([])
  const [file_type, setFileType] = useState('')
  const [empdata, setEmpData] = useState([])
  const [empworkdata, setEmpWorkData] = useState([])
  const [tree_state, setTreeState] = useState({})
  const [base_path, setBasePath] = useState('')
  const [reconstructed_paths, setReconstructedPaths] = useState([])
  const [employees_arr, setEmployeesArr] = useState([])
  const [searchParams] = useSearchParams()
  const code = searchParams.get('datasetID')
  const navigate = useNavigate()

  // function onNameClick ({ defaultOnClick, nodeData }) {
  //   console.log(defaultOnClick)
  //   console.log(nodeData)
  // }

  function reconstruct_path_fn (
    t_state,
    all_paths,
    temp_path,
    path_arr,
    path_index
  ) {
    if (t_state.checked == 0) {
      return
    }
    var t_path = temp_path + '/' + t_state.name
    // console.log("in ", t_state.name)
    if (!('children' in t_state)) {
      all_paths.push(t_path)
      return
    }
    for (var i = 0; i < t_state.children.length; ++i) {
      var temp_state = t_state.children[i]
      reconstruct_path_fn(
        temp_state,
        all_paths,
        t_path,
        path_arr,
        path_index + 1
      )
    }
  }

  const onTreeStateChange = (state, event) => {
    // console.log(state)
    // console.log(event)

    if (event.type === 'checkNode') {
      var all_paths = [],
        all_paths_backup = []
      reconstruct_path_fn(state, all_paths_backup, base_path, event.path, 0)
      // console.log('DFS result: ', all_paths_backup)

      if (file_type == 'xlsx') {
        for (var path of all_paths_backup) {
          var folders = path.split('/')
          var path = ''
          for (var i = 0; i < folders.length - 1; ++i) {
            path += folders[i]
            if (i < folders.length - 2) {
              path += '/'
            }
          }
          path += '.' + file_type + '?sheet=' + folders[folders.length - 1]
          all_paths.push(path)
        }
        // console.log("Modified paths: ", all_paths)
        all_paths_backup = all_paths
      }
      setReconstructedPaths([])

      // to get current state do this. but changes are not reflected in the variable. Need to call setRecon... to reflect changes.
      // reconstructed_paths.push(...all_paths_backup)

      // reconstructedpaths var stores prev state at this point. But after clicking on add button the state changes.
      setReconstructedPaths(all_paths_backup)
      // console.log("Reconstructed path var: ", reconstructed_paths)
    }
  }

  function empCheckHandler (event, id) {
    // console.log(event.target.checked)
    // console.log(id)
    if (event.target.checked) {
      employees_arr.push(id)
    } else {
      const index = employees_arr.indexOf(id)
      // console.log(index)
      if (index > -1) {
        employees_arr.splice(index, 1) // 2nd parameter means remove one item only
      }
    }
    // console.log(employees_arr)
  }

  useEffect(() => {
    async function fetchData () {
      const req = await axios.get('/universal_table/get_dataset_info')
      const req2 = await axios.get('/universal_table/get_employee_info')
      const req3 = await axios.get('/universal_table/get_employee_work_info')
      const req4 = await axios.get('/universal_table/get_data')

      setData(req.data.filter(item => item.dataset_id === code))
      setEmpData(req2.data)
      setEmpWorkData(req3.data)
      setFileType(
        req4.data.filter(item => item.dataset_id === code)[0]
          .dataset_content_type
      )
    }
    fetchData()
  }, [])

  useEffect(() => {
    // console.log("emp proj data table: ", empworkdata)
    var temp_arr = empworkdata.map(item => item.emp_project_path_id)
    // console.log("path ids in emp proj data table: ", temp_arr)
    setData(data.filter(item => !(temp_arr.includes(item.dataset_path_name))))
    // console.log("dataset table with unmapped paths: ", data)
  }, [empworkdata])

  // console.log("Dataset info", data);
  // console.log("Emp info", empdata)
  // console.log("emp work info", empworkdata)

  useEffect(() => {
    var temp_tree_state = {}
    var paths = data.map(x => x.dataset_path_name)

    setBasePath('../unzipped_dataset')
    setTreeState({})
    for (let i in paths) {
      var temp_path = paths[i]
      temp_path = temp_path.split(base_path + '/')[1]

      var folders = temp_path.split('/')
      var t2_tree_state = temp_tree_state
      for (var j = 0; j < folders.length; ++j) {
        if (j === folders.length - 1) {
          var folder = folders[j].split('.' + file_type)
          if (folder[0] !== t2_tree_state.name) {
            var k
            var found_flag = false
            if ('children' in t2_tree_state) {
              for (k = 0; k < t2_tree_state.children.length; ++k) {
                if (t2_tree_state.children[k].name === folder[0]) {
                  t2_tree_state.isOpen = true
                  t2_tree_state = t2_tree_state.children[k]
                  found_flag = true
                  break
                }
              }
            }

            if (!found_flag) {
              var t3 = {}
              t3.name = folder[0]
              t3.checked = 0
              if (!('children' in t2_tree_state)) {
                t2_tree_state.children = []
              }
              t2_tree_state.children.push(t3)
              t2_tree_state =
                t2_tree_state.children[t2_tree_state.children.length - 1]
            }
          }
          if (file_type === 'xlsx') {
            var sheetname = folder[1].split('sheet=')[1]
            if (sheetname !== t2_tree_state.name) {
              var k
              var found_flag = false
              if ('children' in t2_tree_state) {
                for (k = 0; k < t2_tree_state.children.length; ++k) {
                  if (t2_tree_state.children[k].name === sheetname) {
                    t2_tree_state.isOpen = true
                    t2_tree_state = t2_tree_state.children[k]
                    found_flag = true
                    break
                  }
                }
              }
              if (!found_flag) {
                var t3 = {}
                t3.name = sheetname
                t3.checked = 0
                if (!('children' in t2_tree_state)) {
                  t2_tree_state.children = []
                }
                t2_tree_state.children.push(t3)
                t2_tree_state =
                  t2_tree_state.children[t2_tree_state.children.length - 1]
              }
            }
          }
          break
        }
        if (Object.keys(t2_tree_state).length === 0) {
          t2_tree_state.name = folders[j]
          t2_tree_state.checked = 0
        } else {
          if (folders[j] !== t2_tree_state.name) {
            var k
            var found_flag = false
            if ('children' in t2_tree_state) {
              for (k = 0; k < t2_tree_state.children.length; ++k) {
                if (t2_tree_state.children[k].name === folders[j]) {
                  t2_tree_state.isOpen = true
                  t2_tree_state = t2_tree_state.children[k]
                  found_flag = true
                  break
                }
              }
            }
            if (!found_flag) {
              var t3 = {}
              t3.name = folders[j]
              t3.checked = 0
              if (!('children' in t2_tree_state)) {
                t2_tree_state.children = []
              }
              t2_tree_state.children.push(t3)
              t2_tree_state =
                t2_tree_state.children[t2_tree_state.children.length - 1]
            }
          }
        }
      }
    }
    setTreeState(temp_tree_state)
  }, [data])

  async function add_mapping_data () {
    // console.log(reconstructed_paths)
    // console.log(employees_arr)

    var insert_obj = []
    var per_emp = Math.ceil(reconstructed_paths.length / employees_arr.length)
    // console.log(per_emp)

    var emp_index
    var path_index = 0
    for (emp_index = 0; emp_index < employees_arr.length; ++emp_index) {
      for (
        var j = 0;
        path_index < reconstructed_paths.length && j < per_emp;
        ++j, ++path_index
      ) {
        insert_obj.push({
          emp_id: employees_arr[emp_index],
          path_id: reconstructed_paths[path_index]
        })
      }
    }
    // console.log(insert_obj)

    for (var obj of insert_obj) {
      const response = await axios
        .post('/universal_table/set_emp_proj_data', {
          emp_id: obj.emp_id,
          emp_path_id: obj.path_id
        })
        .then(response => {
          console.log('Insertion for ', obj.emp_id, 'complete')
          // console.log(response.data)
        })
    }

    const req3 = await axios.get('/universal_table/get_employee_work_info')
    setEmpWorkData(req3.data)
  }

  return data.length > 0 ? (
    <div className='home'>
      <Box sx={{ width: '100', height: '100', padding: '20px' }}>
        <Grid container>
          <Grid item xs={6}>
            <Box textAlign='center'>
              <Div>{'Files in the Dataset'}</Div>
            </Box>
            <Paper style={{ height: 600, overflow: 'auto', width: '95' }}>
              <Item>
                <FolderTree
                  data={tree_state}
                  initOpenStatus='custom'
                  onChange={onTreeStateChange}
                  // onNameClick={onNameClick}
                />
              </Item>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign='center'>
              <Div>{'Employee List'}</Div>
            </Box>
            <Paper style={{ height: 600, overflow: 'auto', width: '95' }}>
              <Item>
                {empdata
                  .filter(item => item.emp_role === 0)
                  .map(item => (
                    <FormGroup key={item.emp_id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={event =>
                              empCheckHandler(event, item.emp_id)
                            }
                          />
                        }
                        label={item.emp_id}
                      />
                    </FormGroup>
                  ))}
              </Item>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign='center'>
        <Button
          id='add_btn'
          variant='outlined'
          size='large'
          onClick={() => add_mapping_data()}
        >
          Add
        </Button>
      </Box>
    </div>
  ) : (
    <div>NO DATA</div>
  )
}

export default DivideDataset
