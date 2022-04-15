import mongoose from "mongoose";
// database schema
// outline the structure of the tinder cards inside the db

// this is how our db fields are gonna be built
const universal_table_schema = mongoose.Schema({
  dataset_ID: String,
  dataset_name: String,
  version: {type: Number, default: 1.0},
  date_time: {type: String, default: new Date().toLocaleString()},
  source: String, 
  status: {type: String, default: "Pending"},
  file_type: {type: String, default: "sql"}
});

// export the whole schema, define collection name, and pass in the cardSchema
// in nosql Database: collection > [documents] > collection > [documents] > ....
export default mongoose.model("universal_tables", universal_table_schema);