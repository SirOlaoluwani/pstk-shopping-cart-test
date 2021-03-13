const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const User = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

User.findUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

module.exports = User;
