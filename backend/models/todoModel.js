const mongoose = require("mongoose");
const todoModel = mongoose.Schema({
  todo: {
    required: true,
    type: String,
  },
});

const todos = mongoose.model("todos", todoModel);

module.exports = todos;
