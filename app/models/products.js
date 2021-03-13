const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Products = sequelize.define(
  "products",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    manufacturer: DataTypes.STRING,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    sku: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    stockLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [{ unique: true, fields: ["sku"] }],
  }
);

Products.findBySKU = async (sku) => {
  return await Products.findOne({
    where: {
      sku,
    },
  });
};

module.exports = Products;
