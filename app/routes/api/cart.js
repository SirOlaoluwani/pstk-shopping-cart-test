const route = require("express").Router();

//Fetch 
route.get("/:userId", require("../../controllers/CartController").index);
route.post("/:userId/add", require("../../controllers/CartController").add);
route.delete(
  "/delete/:cartId",
  require("../../controllers/CartController").destroy
);
route.put(
  "/update/:cartId",
  require("../../controllers/CartController").update
);

module.exports = route;
