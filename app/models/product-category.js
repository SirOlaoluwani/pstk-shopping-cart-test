const { DataTypes } = require("sequelize");
const Category = require("./category");
const { sequelize } = require("./index");
const Products = require("./products");

const ProductCategory = sequelize.define("product_category", {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Products.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "product_id",
  as: "categories",
});

Category.belongsToMany(Products, {
  through: ProductCategory,
  foreignKey: "category_id",
  as: "products",
});

module.exports = ProductCategory;
