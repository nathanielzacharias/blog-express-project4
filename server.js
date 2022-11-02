require("dotenv").config();

const connectToMongo = require("./database/mongodb");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const req = require("express/lib/request");
const app = express();
const port = process.env.PORT || 8000;

//use body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 

//routes
const userRouter = require("./routers/userRoutes");
const articleRouter = require("./routers/articleRoutes");

//Router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/main", articleRouter);

//Server
app.listen(port, async () => {
  try {
    await mongoose.connect(connectToMongo.uri, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("Failed to connect to Mongo Atlas. Error is: ", err);
    process.exit(1);
  }

  console.log(`Clog blogging system is listening on port ${port}`);
});
