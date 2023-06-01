const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/task_list";

mongoose
  .connect(uri)
  .then(console.log("Connection with MongoDB is successful"))
  .catch((err) => {
    console.log("Error while connecting to the mongoDB", err);
  });
