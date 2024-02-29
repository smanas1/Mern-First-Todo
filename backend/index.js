const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");
const mongodbConnect = require("./config/mongodbConnect");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
mongodbConnect();
// Routes
app.use("/", router);
app.listen(8000, () => {
  console.log("listening on 8000");
});
