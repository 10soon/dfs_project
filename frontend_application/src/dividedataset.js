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
    padding: theme.spacing(1),
  }));

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
  const [searchParams] = useSearchParams()
  const code = searchParams.get('datasetID')
  const navigate = useNavigate()

  function onNameClick ({ defaultOnClick, nodeData }) {
    console.log(defaultOnClick)
    console.log(nodeData)
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

  // console.log("Dataset info", data);
  // console.log("Emp info", empdata)
  // console.log("emp work info", empworkdata)

  // PASS BY COPY REFERENCE IN JS IS MESSING UP VARIABLES. FOLLOWING IS ERROR PRONE CODE
  // useEffect(() => {
  //   function recurse (tree_state, folder, isLastFileOpen) {
  //     if (Object.keys(tree_state).length === 0) {
  //       console.log('root case')
  //       // root case
  //       tree_state.name = folder
  //       tree_state.checked = 0
  //       tree_state.children = []
  //       tree_state.isOpen = false
  //     } else {
  //       if (folder[0] !== tree_state.name) {
  //         console.log('root not empty and name didnt match')
  //         console.log('in', tree_state.name)
  //         var k
  //         var found_flag = false
  //         for (k = 0; k < tree_state.children.length; ++k) {
  //           if (tree_state.children[k].name === folder) {
  //             console.log('folder found in tree')
  //             tree_state.isOpen = true
  //             Object.assign(tree_state, tree_state.children[k])
  //             // tree_state = tree_state.children[k]
  //             found_flag = true
  //             break
  //           }
  //         }
  //         if (!found_flag) {
  //           console.log('folder not in tree')
  //           var t3 = {}
  //           t3.name = folder
  //           t3.checked = 0
  //           t3.children = []
  //           t3.isOpen = isLastFileOpen
  //           tree_state.children.push(t3)
  //           Object.assign(tree_state, tree_state.children[tree_state.children.length - 1])
  //           // tree_state =
  //           // tree_state.children[tree_state.children.length - 1]
  //           console.log('Added new object: ', t3)
  //           console.log("after adding object, tree state: ", tree_state.name)
  //         }
  //       } else {
  //         console.log('name matched with: ', tree_state.name)
  //       }
  //     }
  //   }

  //   var temp_tree_state = {}
  //   var paths = data.map(x => x.dataset_path_name)

  //   // paths = ['unzipped_dataset/A/A1/A11/file', 'unzipped_dataset/A/A2/file']

  //   setTreeState({})
  //   for (let i in paths) {
  //     var temp_path = paths[i]
  //     console.log('Dataset path: ', temp_path)
  //     temp_path = temp_path.split('unzipped_dataset/')[1]

  //     var folders = temp_path.split('/')
  //     var t2_tree_state = temp_tree_state
  //     // console.log()
  //     for (var j = 0; j < folders.length; ++j) {
  //       console.log('folder: ', folders[j])
  //       console.log('temp state: ', t2_tree_state)
  //       // console.log('final state: ', temp_tree_state)

  //       if (j === folders.length - 1) {
  //         console.log('Last file')
  //         var folder = folders[j].split('.' + file_type)
  //         console.log(folder)

  //         recurse(t2_tree_state, folder[0], true)

  //         if (file_type === 'xlsx') {
  //           var sheetname = folder[1].split('sheet=')[1]
  //           console.log(sheetname)

  //           recurse(t2_tree_state, sheetname, false)
  //         }
  //         break
  //       }

  //       recurse(t2_tree_state, folders[j], true)
  //       console.log("after calling recurse: ", t2_tree_state.name)
  //     }
  //     break
  //   }

  //   console.log(temp_tree_state)
  //   setTreeState(temp_tree_state)
  // }, [data])

  useEffect(() => {
    var temp_tree_state = {}
    var paths = data.map(x => x.dataset_path_name)

    // paths = ['unzipped_dataset/A/A1/A11/file', 'unzipped_dataset/A/A2/file']

    setTreeState({})
    for (let i in paths) {
      var temp_path = paths[i]
      // console.log('Dataset path: ', temp_path)
      temp_path = temp_path.split('unzipped_dataset/')[1]

      var folders = temp_path.split('/')
      var t2_tree_state = temp_tree_state
      for (var j = 0; j < folders.length; ++j) {
        // console.log('folder: ', folders[j])
        // console.log('temp state: ', t2_tree_state)
        // console.log('final state: ', temp_tree_state)

        if (j === folders.length - 1) {
          // console.log('Last file')
          var folder = folders[j].split('.' + file_type)
          // console.log(folder)

          if (folder[0] !== t2_tree_state.name) {
            // console.log('root not empty and name didnt match')
            // console.log('in', t2_tree_state.name)
            var k
            var found_flag = false
            if ('children' in t2_tree_state) {
              for (k = 0; k < t2_tree_state.children.length; ++k) {
                if (t2_tree_state.children[k].name === folder[0]) {
                  // console.log('folder found in tree')
                  t2_tree_state.isOpen = true
                  t2_tree_state = t2_tree_state.children[k]
                  found_flag = true
                  break
                }
              }
            }

            if (!found_flag) {
              // console.log('folder not in tree')
              var t3 = {}
              t3.name = folder[0]
              t3.checked = 0
              // t3.children = []
              // t3.isOpen = true
              if(!('children' in t2_tree_state)) {
                t2_tree_state.children = []
              }
              t2_tree_state.children.push(t3)
              t2_tree_state =
                t2_tree_state.children[t2_tree_state.children.length - 1]
              // console.log('Adding new object: ', temp_tree_state)
            }
          }
          // else {
          //   // console.log('name matched with: ', t2_tree_state.name)
          // }

          if (file_type === 'xlsx') {
            var sheetname = folder[1].split('sheet=')[1]
            // console.log(sheetname)

            if (sheetname !== t2_tree_state.name) {
              // console.log('root not empty and name didnt match')
              // console.log('in', t2_tree_state.name)
              var k
              var found_flag = false
              if ('children' in t2_tree_state) {
                for (k = 0; k < t2_tree_state.children.length; ++k) {
                  if (t2_tree_state.children[k].name === sheetname) {
                    // console.log('folder found in tree')
                    t2_tree_state.isOpen = true
                    t2_tree_state = t2_tree_state.children[k]
                    found_flag = true
                    break
                  }
                }
              }
              if (!found_flag) {
                // console.log('folder not in tree')
                var t3 = {}
                t3.name = sheetname
                t3.checked = 0
                // t3.children = []
                // t3.isOpen = false
                if(!('children' in t2_tree_state)) {
                  t2_tree_state.children = []
                }
                t2_tree_state.children.push(t3)
                t2_tree_state =
                  t2_tree_state.children[t2_tree_state.children.length - 1]
                // console.log('Adding new object: ', temp_tree_state)
              }
            }
            // else {
            //   console.log('name matched with: ', t2_tree_state.name)
            // }
          }
          break
        }

        if (Object.keys(t2_tree_state).length === 0) {
          // console.log('root case')
          t2_tree_state.name = folders[j]
          t2_tree_state.checked = 0
          // t2_tree_state.children = []
          // t2_tree_state.isOpen = false
        } else {
          if (folders[j] !== t2_tree_state.name) {
            // console.log('root not empty and name didnt match')
            // console.log('in', t2_tree_state.name)
            var k
            var found_flag = false
            if ('children' in t2_tree_state) {
              for (k = 0; k < t2_tree_state.children.length; ++k) {
                if (t2_tree_state.children[k].name === folders[j]) {
                  // console.log('folder found in tree')
                  t2_tree_state.isOpen = true
                  t2_tree_state = t2_tree_state.children[k]
                  found_flag = true
                  break
                }
              }
            }
            if (!found_flag) {
              // console.log('folder not in tree')
              var t3 = {}
              t3.name = folders[j]
              t3.checked = 0
              // t3.children = []
              // t3.isOpen = false
              if(!('children' in t2_tree_state)) {
                t2_tree_state.children = []
              }
              t2_tree_state.children.push(t3)
              t2_tree_state =
                t2_tree_state.children[t2_tree_state.children.length - 1]
              // console.log('Adding new object: ', temp_tree_state)
            }
          }
          //  else {
          //   console.log('name matched with: ', t2_tree_state.name)
          // }
        }
      }
    }

    // console.log(temp_tree_state)
    setTreeState(temp_tree_state)
  }, [data])

  return data.length > 0 ? (
    <div className='home'>
      <Box sx={{ width: '100', height: '100', padding: '20px' }}>
        <Grid container>
          <Grid item xs={6}>
            <Box textAlign='center'>
                <Div>{"Files in the Dataset"}</Div>
            </Box>
          <Paper style={{height: 600, overflow: 'auto', width: '95'}}>
            <Item>
              <FolderTree
                data={tree_state}
                initOpenStatus='custom'
                onNameClick={onNameClick}
              />
            </Item>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign='center'>
            <Div>{"Employee List"}</Div>
            </Box>
          <Paper style={{height: 600, overflow: 'auto', width: '95'}}>
            <Item>
                {empdata.filter(item => item.emp_role === 0).map(item => 
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label={item.emp_id} />
                    </FormGroup>
                )}
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
        //   onClick={() => verify_source()}
        >
          Add
        </Button>
      </Box>
    </div>
  ) : (
    <div>LOADING</div>
  )
}

export default DivideDataset
