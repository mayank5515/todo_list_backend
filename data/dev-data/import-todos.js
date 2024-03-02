const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../modals/todoModal");
//reading env variables once
dotenv.config({ path: "./../../config.env" });
//DATABASE
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((doc) => console.log("DB connection successful"));

//DATA
const todoSimpleData = JSON.parse(
  fs.readFileSync("./todos-simple.json", "utf-8")
);
//FUNCTIONS
const importData = async () => {
  try {
    await Tour.create(todoSimpleData);
    console.log("Data successfully imported to database!");
  } catch (err) {
    console.log("Error occured while importing data to database", err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted from database!");
  } catch (err) {
    console.log("Error occured while deleting data from database", err);
  }
  process.exit();
};
if (process.argv[2] == "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  deleteData();
}
// console.log(process.argv);
