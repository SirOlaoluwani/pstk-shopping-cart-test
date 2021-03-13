const Category = require("../models/category");

const index = async (req, res) => {
  try {
    const categories = await Category.findAll({ include: ["products"] });
    if (categories) {
      res.status(200).send(categories);
    }
  } catch (error) {
    res.status(400).send({
      error: error.toString(),
    });
  }
};

const store = async (req, res) => {
  try {
    const body = req.body;
    const category = await Category.create(body);
    res.status(200).send(category);
  } catch (error) {
    res.status(400).send({
      error: error.toString(),
    });
  }
};

const destroy = async (req, res) => {
  try {
    //Get the ID from the URL params
    const { categoryId } = req.params;
    const del = await Category.destroy({
      where: {
        id: categoryId,
      },
    });

    if (del) {
      res.status(200).send({ message: "Category deleted successfully" });
    } else {
      throw new Error("Category not deleted");
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
  destroy,
};
