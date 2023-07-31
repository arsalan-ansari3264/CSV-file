/** ------------------ IMPORTING PACKAGE ------------------ **/
const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();
const path = require("path");

const expressLayouts = require("express-ejs-layouts");
const csv = require("csv-parser");
// const db = require("./config/mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

// setting layouts
app.use(expressLayouts);

// middleware for body-parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//accesing static files from assets folder
app.use(express.static("./assets"));

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// setting up routes
app.use("/", require("./routes"));

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// directing the app in the given port

mongoose.set("strictQuery", false);
connectDB().then(() => {
  app.listen(PORT, function (err) {
    if (err) {
      console.log("Error", err);
      return;
    }
    console.log(`server started on port  : ${PORT}`);
  });
});
