const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname + "dist/currency-calculator"));

app.get("/current", function (req, res) {
  res.sendFile(path.join(__dirname + "dist/currency-calculator/index.html"));
});

app.listen(8080);
