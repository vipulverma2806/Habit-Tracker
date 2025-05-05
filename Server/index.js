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
    const response = await habit.save();
    res.json(response._id.toString());
  } catch (err) {
    res.json(err.message);
  }
});

app.put("/update", async (req, res) => {
  const { hname, category, tags, id } = req.body;
  try {
    const response = await Habit.findByIdAndUpdate(
      id,
      {
        hname: hname,
        category: category,
        tags: tags,
      },
      { new: true }
    );
    console.log(response);
    res.json(response);
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

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await Habit.findByIdAndDelete(id);

    console.log("Deleted Successfully");
    res.json("deleted");
  } catch (err) {
    console.log(err);
  }
});

app.listen("4545", () => {
  console.log("Server is running on 4545");
});
