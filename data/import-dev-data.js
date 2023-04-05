const dotenv = require("dotenv");
const fs = require("fs");
const mongoose = require("mongoose");
const Tour = require("./../model/tourModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;
mongoose
  //.connect(process.env.DATABASE_LOCAL,
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!!!"));

//Read JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf8"));

//IMPORT DATA TO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data is Succesffuly imported");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data is Succesffuly Deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
