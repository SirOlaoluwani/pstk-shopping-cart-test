const route = require("express").Router();

route.get("/", require("../../controllers/CategoryController").index);
route.post("/store", require("../../controllers/CategoryController").store);
route.delete(
  "/delete/:categoryId",
  require("../../controllers/CategoryController").destroy
);

module.exports = route;
