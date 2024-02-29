const express = require("express");
const todos = require("../models/todoModel");
const router = express.Router();

router.get("/get", async (req, res) => {
  const todo = await todos.find().sort({ _id: -1 });
  res.send(todo);
});

router.post("/post", async (req, res) => {
  try {
    const { todo } = req.body;
    const data = new todos({
      todo: todo,
    });
    await data.save();
    res.send(todo);
  } catch (error) {
    console.log(error);
  }
});

router.put("/update/:id", async (req, res) => {
  const update = await todos.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(update);
});

router.delete("/delete/:id", async (req, res) => {
  const deleteTodo = await todos.findByIdAndDelete(req.params.id);
  res.send("todo deleted");
});
module.exports = router;
