const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Habit = require("./Model");
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Habit")
  .then((response) => {
    console.log("MongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/add", async (req, res) => {
  const { hname, category, tags } = req.body;
  try {
    const habit = new Habit({ hname, category, tags });
    await habit.save();
    res.json("ok");
  } catch (err) {
    res.json(err.message);
  }
});

app.get("/get", async (req, res) => {
  try {
    const habit = await Habit.find();
    res.json(habit);
  } catch (err) {
    res.json(err.message);
  }
});

app.listen("4545", () => {
  console.log("Server is running on 4545");
});
