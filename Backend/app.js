const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/borrow", require("./routes/borrowRoutes"));

// default route
app.get("/", (req, res) => {
  res.json({ message: "Library System API Running" });
});

module.exports = app;
