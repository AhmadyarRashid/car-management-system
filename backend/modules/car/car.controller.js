// NPM dependencies
const { to } = require("await-to-js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// App dependencies
const winston = require('../../config/winston');
const common = require('../common/common');
const categoryModel = require('../../models/category');
const carModel = require('../../models/car');

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
    winston.info(`Deleting category ${req.params.id} by ${req.user.userId}`);
    categoryModel.findOneAndDelete({_id: new mongoose.Types.ObjectId(req.params.id)}, {}, (err, response) => {
      if (err) {
        winston.error(`Delete Category API failed with error ${err}`);
        next(err);
      } else {
        res.status(200).send(common.getResponseObject('Category deleted', 200, 1, response));
      }
    });
  },

  /**
   * Add New Car
   * @param req
   * @param res
   * @param next
   */
  async addCar(req, res, next) {
    const car = new carModel(req.body);
    const [isError, carResponse] = await to(car.save());
    if (isError) {
      winston.error(`Update Category failed error ${isError}`);
      next(isError);
    } else {
      winston.info(`Car with name ${req.body.name} added by ${req.user.userId}`)
      res.status(200).send(common.getResponseObject('Added Successfully', 200, 1, carResponse));
    }
  },
  /**
   * Get Cars
   * @param req
   * @param res
   * @param next
   */
  fetchCars(req, res, next) {
    carModel.find({}, async (err, cars) => {
        if (err) {
          winston.error(`Update Category failed error ${err}`);
          next(err);
        } else {
          res.status(200).send(common.getResponseObject('Fetched Successfully', 200, 1, cars));
        }
    });
  },
  /**
   * Update Cars
   * @param req
   * @param res
   * @param next
   */
  updateCars(req, res, next) {
    carModel.findByIdAndUpdate(req.params.id, req.body, {}, (err) => {
      if (err) {
        winston.error(`Update Car failed with error ${err}`);
        next(err);
      } else {
        res.status(200).send(common.getResponseObject('Car Updated', 200, 1));
      }
    });
  },
  /**
   * Delete Car
   * @param req
   * @param res
   * @param next
   */
  deleteCar(req, res, next) {
    carModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id)}, {}, (err, response) => {
      if (err) {
        winston.error(`Delete Car API failed with error ${err}`);
        next(err);
      } else {
        res.status(200).send(common.getResponseObject('Car deleted', 200, 1));
      }
    });
  },
};
