const route = require("express").Router();

route.use("/users", require("./users"));
route.use("/products", require("./products"));
route.use("/categories", require("./categories"));
route.use("/cart", require("./cart"));

module.exports = {
  route,
};
