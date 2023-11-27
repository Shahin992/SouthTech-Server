const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("SouthTech Server is Running");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });