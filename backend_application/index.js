import express from "express";
import mongoose from "mongoose";
import universal_tables from "./universal_table.js";
import Cors from "cors";
import bodyParser from "body-parser";

// App Config
const app = express();
const port = process.env.PORT || 8001; // port app gonna listen
const connection_url = "mongodb+srv://admin123:admin%40123@cluster0.3gdiq.mongodb.net/universal_table?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(Cors());
app.use(bodyParser.json());

// DB config
mongoose.connect(connection_url, {
  // pass in couple of parameters to our connection, make our connection smooth

  // following giving error on npm start
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
});

console.log("Connected to DB.")

// API Endpoints
// ## go root url, callback func
app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD!!!");
});

// add data to db, endpoint /tinder/card
app.post("/universal_table/add_data", async (req, res) => {
  // sample postman input
  // {
  //   "dataset_ID": "D125",
  //   "dataset_name": "Dataset3",
  //   "source": "CDEF",
  //   "date_time": "15-04-2022"
  // }

  // save request body into a var
  const request_body = req.body;

  //   function to create a new document
  universal_tables.create(request_body, (err, data) => {
    // if there is error
    if (err) {
      // set response to 500, which means internal server error and send error back
      res.status(500).send(err);
    } else {
      // 201 means created, successfully created our data and send back the data
      res.status(201).send(data);
    }
  });
});

// another endpoint (the same) which will download data from the db
// with this will be retrieving every single thing from the collection DB that we just created
app.get("/universal_table/get_data", (req, res) => {
  //   function to find data
  universal_tables.find((err, data) => {
    // if there is error
    if (err) {
      // set response to 500, which means internal server error and send error back
      res.status(500).send(err);
    } else {
      // 200 means found
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));