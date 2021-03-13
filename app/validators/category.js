const { body, param } = require("express-validator");
const Category = require("../models/category");

const validateSlug = (value) => {
  return Category.findBySlug(value).then((slug) => {
    if (slug) {
      return Promise.reject("Slug already in use");
    }
  });
};

const validateCategoryId = (value) => {
  return Category.findByPk(value).then((category) => {
    if (!category) {
      return Promise.reject("Category does not exist");
    }
  });
};

const createCategoryValidationRules = () => {
  return [body("name"), body("slug").isSlug().custom(validateSlug)];
};

const deleteCategoryValidationRules = () => {
  return [param("categoryId").custom(validateCategoryId)];
};

module.exports = {
  createCategoryValidationRules,
  deleteCategoryValidationRules,
};
