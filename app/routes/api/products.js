const route = require("express").Router();

route.get("/", require("../../controllers/ProductController").index);
route.post("/store", require("../../controllers/ProductController").store);
route.put(
  "/update/:productId",
  require("../../controllers/ProductController").update
);
route.delete(
  "/delete/:productId",
  require("../../controllers/ProductController").destroy
);

module.exports = route;
