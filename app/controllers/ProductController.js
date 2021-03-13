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
      const categoryExistsError = [];
      //Validate that `body.categories` exists and is not empty.
      if (Array.isArray(body.categories) && !isEmpty(body.categories)) {
        for (const category of body.categories) {
          //check if the category exists
          const categoryExists = await Category.findByPk(category);
          if (categoryExists) {
            // Add the data into the product category table.
            const c = await ProductCategory.create(
              {
                category_id: category,
                product_id: product.id,
              },
              { transaction: t }
            );

            categoryArr.push(c);
          } else {
            //append the category_id into the categoryExistsError array
            categoryExistsError.push(category);
          }
        }

        //Check if the categoryExistsError array is not empty, then throw an error
        if (categoryExistsError.length) {
          throw new Error(
            `The following categories do not exist: ${categoryExistsError.toString()}`
          );
        }
      } else {
        throw new Error("Categories must be an array and cannot be empty!");
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
      data: error,
    });
  }
};

const update = async (req, res) => {
  try {
    //Get the ID from the URL params
    const { productId } = req.params;

    //Find the product by its ID
    const product = await Products.findByPk(productId);
    if (product) {
      const categoryArr = [];
      const categoryExistsError = [];

      //Begin managed transactions
      const result = await sequelize.transaction(async (t) => {
        const body = req.body;
        // Update the product
        const updatedProduct = await product.update(body, { transaction: t });
        //Validate that `body.categories` exists as an array.
        if (Array.isArray(body.categories)) {
          for (const category of body.categories) {
            //check if the category exists
            const categoryExists = await Category.findByPk(category);
            if (categoryExists) {
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
            } else {
              //append the category_id into the categoryExistsError array
              categoryExistsError.push(category);
            }
          }

          //Check if the categoryExistsError array is not empty, then throw an error
          if (categoryExistsError.length) {
            throw new Error(
              `The following categories do not exist: ${categoryExistsError.toString()}`
            );
          }
        } else {
          throw new Error("Categories must be an array");
        }
        return { product: updatedProduct, categories: categoryArr };
      });

      if (result) {
        //send back success response
        res
          .status(200)
          .send({ message: "Product updated successfully", data: result });
      }
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    //send back error response
    res.status(400).send({
      message: error.toString(),
      data: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    //Get the ID from the URL params
    const { productId } = req.params;
    const result = await sequelize.transaction(async (t) => {
      const del = await Products.destroy({
        where: {
          id: productId,
        },
        transaction: t,
      });
      //Delete the product
      if (del) {
        return del;
      } else {
        throw new Error("product not found");
      }
    });

    if (result) {
      //send back success response
      res.status(200).send({ message: "Product deleted successfully" });
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
  store,
  update,
  destroy,
};
