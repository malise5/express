const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  "process.env.DATABASE_PASSWORD"
);
mongoose
  //.connect(process.env.DATABASE_LOCAL,
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!!!"));

const port = process.env.PORT || 8000;

/*========================================================== */
/*=======================Server Port======================*/

app.listen(port, () => {
  console.log("====================================");
  console.log(`Listening on port ${port}......`);
  console.log("====================================");
});
/*========================================================== */
/*========================Server Port===================== */
