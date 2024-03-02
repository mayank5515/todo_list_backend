const express = require("express");
const morgan = require("morgan");
const router = require("./routes/todoRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const cors = require("cors");
//reading env variables once
dotenv.config({ path: "./config.env" });

//middlewares
const app = express();
app.use(morgan("dev"));
// app.use(
//   cors({
//     origin: ["https://deploy-mern-1whq.vercel.app"],
//     methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH ,PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json()); //to get req.body
//DATABASE
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((doc) => console.log("DB connection successful"));

app.use("/api/v1/todo", router);
//SERVER
const port = 8000;
app.listen(port, () => {
  console.log(`Listening to  server on port ${port}....`);
});
