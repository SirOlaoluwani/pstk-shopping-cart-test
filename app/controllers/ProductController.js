const { isEmpty } = require("lodash");
const { sequelize } = require("../models");
const Category = require("../models/category");
const ProductCategory = require("../models/product-category");
const Products = require("../models/products");

const index = async (req, res) => {
  try {
    //Eager load products and categories
    const products = await Products.findAll({ include: ["categories"] });
    if (products) {
      res.status(200).send(products);
    }
  } catch (error) {
    res.status(400).send({
      message: error.toString(),
    });
  }
};

const store = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const body = req.body;
      // Create the product
      const product = await Products.create(body, { transaction: t });
      const categoryArr = [];
      for (const category of body.categories) {
        // Add the data into the product category table.
        const c = await ProductCategory.create(
          {
            category_id: category,
            product_id: product.id,
          },
          { transaction: t }
        );

        categoryArr.push(c);
      }

      return { product, categories: categoryArr }; //
    });

    if (result) {
      //send back success response
      res.status(201).send({
        message: "Product created successfully",
        data: result,
      });
    }
  } catch (error) {
    //send back error response
    res.status(400).send({
      message: error.toString(),
      error,
    });
  }
};

const update = async (req, res) => {
  try {
    //Get the ID from the URL params
    const { productId } = req.params;

    //Find the product by its ID
    const product = await Products.findByPk(productId);
    const categoryArr = [];
    //Begin managed transactions
    const result = await sequelize.transaction(async (t) => {
      const body = req.body;
      // Update the product
      const updatedProduct = await product.update(body, { transaction: t });
      //Validate that `body.categories` exists as an array.
      if (body.categories) {
        for (const category of body.categories) {
          // check if the product_category exists, if not, create it.
          const cat = await ProductCategory.findOrCreate({
            where: {
              category_id: category,
              product_id: product.id,
            },
            transaction: t,
          });

          //check if the data was created, then append it into the category array, else do nothing
          if (cat[1]) {
            categoryArr.push(cat[0]);
          }
        }
      }
      return { product: updatedProduct, categories: categoryArr };
    });

    if (result) {
      //send back success response
      res
        .status(200)
        .send({ message: "Product updated successfully", data: result });
    }
  } catch (error) {
    //send back error response
    res.status(400).send({
      message: error.toString(),
      error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    //Get the ID from the URL params
    const { productId } = req.params;
    const del = await Products.destroy({
      where: {
        id: productId,
      },
    });
    //Delete the product
    if (del) {
      res.status(200).send({ message: "Product deleted successfully" });
    } else {
      throw new Error("Product not deleted");
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
  store,
  update,
  destroy,
};
