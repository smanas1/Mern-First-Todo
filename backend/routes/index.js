const express = require("express");
const todoController = require("../controller/todoController");
const router = express.Router();

router.use("/", todoController);

module.exports = router;
