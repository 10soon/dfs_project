import { React, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "./axios";
import 'react-folder-tree/dist/style.css';
import FolderTree, { testData } from 'react-folder-tree';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  width: "100%",
  height: "100%",
//   textAlign: 'center',
  color: theme.palette.text.secondary,
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

function DivideDataset() {
  const [data, setData] = useState([]);
  const [empdata, setEmpData] = useState([]);
  const [empworkdata, setEmpWorkData] = useState([])
  const [searchParams] = useSearchParams();
  const code = searchParams.get('datasetID');
  const navigate = useNavigate();

  function onNameClick({ defaultOnClick, nodeData }){
      console.log(defaultOnClick);
      console.log(nodeData);
  }

  useEffect(() => {
    async function fetchData () {
      const req = await axios.get('/universal_table/get_dataset_info')
      const req2 = await axios.get('/universal_table/get_employee_info')
      const req3 = await axios.get('/universal_table/get_employee_work_info')

      setData(req.data.filter(item => item.dataset_id === code)) 
      setEmpData(req2.data)
      setEmpWorkData(req3.data)
    }
    fetchData()
  }, [])


  console.log(data);

  return (
      data.length > 0 ?
      <div className="home">
        <Box sx={{ width: '100%', height: '100%' }}>
          <Grid container>
            <Grid item xs={6}>
              <Item>
              <FolderTree
                data={ testData }
                onNameClick={ onNameClick }
              />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>2</Item>
            </Grid>
          </Grid>
        </Box>
        
      </div>
      :
        <div>LOADING</div>
  )
}

export default DivideDataset;