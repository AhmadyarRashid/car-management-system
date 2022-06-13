// NPM dependencies
const { to } = require("await-to-js");
const jwt = require("jsonwebtoken");

// App dependencies
const winston = require('../../config/winston');
const common = require('../common/common');
const constants = require('../../config/constants');
const categoryModel = require('../../models/category');

module.exports = {
  /**
   * Create New Category
   * @param req
   * @param res
   * @param next
   */
  createCategory(req, res, next) {
    const { name } = req.body;
    // check if category already exists or not
    categoryModel.find({name}, async (err, response) => {
      if (err) {
        winston.error(`Category failed error ${err}`);
        next(err);
      } else if (response.length > 1) {
        winston.error(`Category already exists ${name} by UserId ${req.user.userId}`)
        next({
          msgCode: '2003',
          status: 401,
        });
      } else {
        winston.info(`Now create new category ${name} by userId ${req.user.userId}`);
        const newCategory = new categoryModel({name});
        const [isError, categoryResponse] = await to(newCategory.save());
        if (isError) {
          next({
            msgCode: '0005',
            status: 401,
          });
        } else {
          res.status(201).send(common.getResponseObject('Category Created', 200, 1, categoryResponse));
        }
      }
    });
  },
  /**
   * Get Categories
   * @param req
   * @param res
   * @param next
   */
  fetchCategories(req, res, next) {
    categoryModel.find({}, async (err, categories) => {
      if (err) {
        winston.error(`Category failed error ${err}`);
        next(err);
      } else {
        res.status(200).send(common.getResponseObject('Category fetched', 200, 1, categories));
      }
    });
  },
  /**
   * Update Category
   * @param req
   * @param res
   * @param next
   */
  updateCategory(req, res, next) {
    categoryModel.findByIdAndUpdate(req.params.id, req.body, {}, (err) => {
      if (err) {
        winston.error(`Update Category failed error ${err}`);
        next(err);
      } else {
        res.status(200).send(common.getResponseObject('Category Updated', 200, 1));
      }
    });
  },
  /**
   * Delete Category
   * @param req
   * @param res
   * @param next
   */
  deleteCategory(req, res, next) {
    categoryModel.findOneAndDelete(req.params.id, {}, (err, response) => {
      if (err) {
        winston.error(`Update Category failed error ${err}`);
        next(err);
      } else {
        res.status(200).send(common.getResponseObject('Category deleted', 200, 1));
      }
    });
  },

  /**
   * Add New Car
   * @param req
   * @param res
   * @param next
   */
  addCar(req, res, next) {
    res.status(200).send(common.getResponseObject('Authorized successfully', 200, 1, req.user));
  },
  /**
   * Get Cars
   * @param req
   * @param res
   * @param next
   */
  fetchCars(req, res, next) {
    res.status(200).send(common.getResponseObject('Authorized successfully', 200, 1, req.user));
  },
  /**
   * Update Cars
   * @param req
   * @param res
   * @param next
   */
  updateCars(req, res, next) {
    res.status(200).send(common.getResponseObject('Authorized successfully', 200, 1, req.user));
  },
  /**
   * Delete Car
   * @param req
   * @param res
   * @param next
   */
  deleteCar(req, res, next) {
    res.status(200).send(common.getResponseObject('Authorized successfully', 200, 1, req.user));
  },
};
