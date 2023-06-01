const express = require("express");
const path = require("path");
require("./config/connection");
const Task = require("./models/Tasks");

const PORT = process.env.PORT || 8090;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.render("home", {
        title: "Tasks List",
        tasks: tasks,
      });
    })
    .catch((err) => {
      console.log("Error in finding the tasks from database", err);
    });
});

app.post("/create-task", (req, res) => {
  console.log(req.body);
  Task.create({
    task: req.body.task,
  })
    .then(res.redirect("back"))
    .catch((err) => {
      console.log("Error while adding the task", err);
    });
});

app.get("/delete-task", (req, res) => {
  let id = req.query.id;
  Task.findByIdAndDelete(id)
    .then(() => {
      res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in Deleting the task",err);
    });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error: Server is not running", err);
  }
  console.log(`server is running on port ${PORT}`);
});
