const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./index");
const Products = require("./products");
const User = require("./user");

const Cart = sequelize.define("cart", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.belongsTo(Cart, {
  foreignKey: "user_id",
  as: "user",
});

Cart.belongsTo(Products, {
  foreignKey: "product_id",
  as: "user",
});

module.exports = Cart;
