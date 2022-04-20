import express from "express";
import universal_tables from "./universal_table.js";
import Cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql";
import fs from "fs";
import extract from "extract-zip";
import path from "path";
import XLSX from "xlsx";

// App Config
const app = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(Cors());
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Raj@2022",
  database: "universal_table"
});

const getFiles = path => {
  const files = []
  for (const file of fs.readdirSync(path)) {
      const fullPath = path + '/' + file
      if(fs.lstatSync(fullPath).isDirectory())
          getFiles(fullPath).forEach(x => files.push(file + '/' + x))
      else files.push(file)
  }
  return files
}

async function init_dataset_folder(data) {
  const checkPath = "../unzipped_dataset/"
  const f1 = [];
  const f2 = getFiles(checkPath);
  const f3 = [];
  const dirs = [];

  for (const i in data) {
    f1.push(data[i].dataset_path);
  }

  for (const i of f2) {
    if( !dirs.includes(i.split("/")[0]))
      dirs.push(i.split("/")[0])
  }

  for(const i of f1) {
    const x = i.split(".zip")[0]
    const y = x.split("/")
    const z = y.slice(-1)[0]

    if (!dirs.includes(z)) {
      f3.push(z);
      const v1 = path.resolve(i);
      const v2 = path.resolve(checkPath+z+"/");
      // console.log('Unzipping dataset to temp directories...');
      // console.log(i);
      // console.log(checkPath+z+"/")
      await extract(v1, { dir: v2 });
    }
  }
  console.log("All datasets in ../unzipped_dataset/ directory");
  return(f3);
}

function init_dataset_table(funzipped, data){
  const values = [];
  console.log("Updating dataset details table... \t \t (Might take some time...)");

  for (const i of funzipped) {
    for (const j in data) {
      const x = data[j].dataset_path.split(".zip")[0];
      const y = x.split("/");
      const z = y.slice(-1)[0];

      if (z === i) {
        const p = "../unzipped_dataset/" + i ;
        const f = getFiles(p);
        let p_id = 0;

        for (const k in f) {
          let tmp = p + "/" + f[k];

          if (data[j].dataset_content_type === "xlsx") {
            let tmp1 = path.resolve(tmp);
            let workbook = XLSX.readFile(tmp1)
            let sheetnames = workbook.SheetNames;

            for (const a in sheetnames) {
              let sheetpath = tmp + "?sheet=" + sheetnames[a];
              console.log(data[j].dataset_id, p_id, sheetpath);
              values.push([data[j].dataset_id, p_id, sheetpath]);
              p_id = p_id + 1;
            }
          }
          else {
            values.push([data[j].dataset_id, p_id, tmp]);
            p_id = p_id + 1;
          }
        }
        break;
      }
    }
  }
  // console.log(values);
  let q = "insert into `dataset_details` (`dataset_id`, `dataset_path_id`, `dataset_path_name`) values ?";
  con.query(q, [values], function (err, result) {
    if (err) throw err;
  });
  console.log("Updated dataset details table...");
}


con.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});

console.log("Connected to DB.");

// API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD!!!");
});

app.get("/universal_table/get_data", (req, res) => {
    con.query("SELECT * FROM universal_tables", async function (err, result, fields) {
      if (err) throw err;
      res.status(200).send(result);

      const data = JSON.parse(JSON.stringify(result));
      const funzipped = await init_dataset_folder(data);
      // console.log(funzipped);

      if(funzipped.length > 0) {
        init_dataset_table(funzipped, data)
      }
    });
});

app.get("/universal_table/get_dataset_info", (req, res) => {
  con.query("SELECT * FROM dataset_details", function (err, result, fields) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

app.get("/universal_table/get_employee_info", (req, res) => {
  con.query("SELECT * FROM emp_data", function (err, result, fields) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

app.get("/universal_table/get_employee_work_info", (req, res) => {
  con.query("SELECT * FROM emp_proj_data", function (err, result, fields) {
    if (err) throw err;
    res.status(200).send(result);
  });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));