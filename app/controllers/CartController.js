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
      error: error.toString(),
    });
  }
};

const add = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await sequelize.transaction(async (t) => {
      const body = req.body;

      //check if the product exists before inserting to cart table
      const productExist = await Products.findByPk(body.product_id);

      if (productExist) {
        //If product does not exist in the cart add to cart
        const cart = await Cart.findOrCreate(
          // {
          //   quantity: body.quantity,
          //   user_id: userId,
          //   product_id: body.product_id,
          // },
          {
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
          }
        );

        if (cart[1]) {
          return cart[0];
        } else {
          throw new Error("The selected product already exists in the cart!");
        }
      } else {
        throw new Error("The selected product does not exist!");
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
      data: error,
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
    } else {
      throw new Error("Cart not found");
    }
  } catch (error) {
    res.status(400).send({
      message: error.toString(),
      data: error,
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
      throw new Error("Cart not found");
    }
  } catch (error) {
    //send back error response
    res.status(400).send({
      message: error.toString(),
      data: error,
    });
  }
};

module.exports = {
  index,
  add,
  destroy,
  update,
};
