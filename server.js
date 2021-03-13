const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const compression = require("compression");

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.use("/api", require("./app/routes/api").route);

app.listen(4000, () => {
  console.log("Server started at http://localhost:4000");
});
