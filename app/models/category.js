const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("./index");

const Category = sequelize.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["slug"] }],
  }
);

Category.findBySlug = async (slug) => {
  return await Category.findOne({
    where: {
      slug,
    },
  });
};

module.exports = Category;
