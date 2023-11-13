const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017";
// const DB_URL =
//   "mongodb+srv://vaishnavikammara:radhakrishna16#@vaishnavikammara.fxhay9v.mongodb.net/";
const password = encodeURIComponent("radhakrishna16#");
const connectionString = `mongodb://username:${password}@localhost:27017/database`;

const DB_URL = `mongodb+srv://vaishnavikammara:${password}@vaishnavikammara.fxhay9v.mongodb.net/inotebook`;
// const mongoURI =
//   "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectTOMongo = async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to Mongo Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectTOMongo;
