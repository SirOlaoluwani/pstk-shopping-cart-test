const route = require("express").Router();

route.get("/", require("../../controllers/UserController").index);
route.post("/store", require("../../controllers/UserController").store);

module.exports = route;
