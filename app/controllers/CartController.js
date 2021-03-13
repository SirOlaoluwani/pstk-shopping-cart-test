const { sequelize } = require("../models");
const Cart = require("../models/cart");
const Products = require("../models/products");

const index = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findAll({
      where: {
        user_id: userId,
      },
      include: ["products"],
    });
    if (cart) {
      res.status(200).send(cart);
    }
  } catch (error) {
    res.status(400).send({
      message: error.toString(),
    });
  }
};

const add = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await sequelize.transaction(async (t) => {
      const body = req.body;

      const cart = await Cart.findOrCreate({
        where: {
          user_id: userId,
          product_id: body.product_id,
        },
        defaults: {
          quantity: body.quantity,
          user_id: userId,
          product_id: body.product_id,
        },
        transaction: t,
      });

      if (cart[1]) {
        return cart[0];
      } else {
        throw new Error("The product already exists in the cart!");
      }
    });

    if (result) {
      //send back success response
      res
        .status(200)
        .send({ message: "Product added to cart successfully", data: result });
    }
  } catch (error) {
    res.status(400).send({
      message: error.toString(),
      error,
    });
  }
};

const update = async (req, res) => {
  const { cartId } = req.params;

  try {
    const body = req.body;

    const selectedCart = await Cart.findByPk(cartId);

    if (selectedCart) {
      await selectedCart.update({
        quantity: body.quantity,
      });

      res
        .status(200)
        .send({ message: "cart updated successfully", data: selectedCart });
    }
  } catch (error) {
    res.status(400).send({
      message: error.toString(),
      error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    //Get the ID from the URL params
    const { cartId } = req.params;
    const del = await Cart.destroy({
      where: {
        id: cartId,
      },
    });

    if (del) {
      res
        .status(200)
        .send({ message: "Product removed from cart successfully" });
    } else {
      throw new Error("Product not removed from cart");
    }
  } catch (error) {
    //send back error response
    res.status(400).send({
      message: error.toString(),
      error,
    });
  }
};

module.exports = {
  index,
  add,
  destroy,
  update,
};
