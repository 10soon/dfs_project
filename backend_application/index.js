import express from "express";
import universal_tables from "./universal_table.js";
import Cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql";

// App Config
const app = express();
const port = process.env.PORT || 8001; // port app gonna listen

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
    con.query("SELECT * FROM universal_tables", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.status(200).send(result)
    });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));