// App dependencies
const errorMiddleware = require("../common/error-middleware");
const common = require("../common/common");
const carController = require("./car.controller");
const carMiddleware = require("./car.middleware");

const resource = "/car";

module.exports = function (app, version) {
  /**
   * Category CRUD Operations
   */
  app.post(
    `${version}${resource}/category`,
    carMiddleware.validateCategoryParams,
    common.verifyToken,
    errorMiddleware,
    carController.createCategory
  );
  app.get(
    `${version}${resource}/category`,
    common.verifyToken,
    errorMiddleware,
    carController.fetchCategories
  );
  app.put(
    `${version}${resource}/category/:id`,
    carMiddleware.validateParamId,
    carMiddleware.validateCategoryParams,
    common.verifyToken,
    errorMiddleware,
    carController.updateCategory
  );
  app.delete(
    `${version}${resource}/category/:id`,
    carMiddleware.validateParamId,
    common.verifyToken,
    errorMiddleware,
    carController.deleteCategory
  );

  /**
   * Car CRUD Operations
   */
  app.post(
    `${version}${resource}`,
    carMiddleware.validateAddCarParams,
    common.verifyToken,
    errorMiddleware,
    carController.addCar
  );
  app.get(
    `${version}${resource}`,
    common.verifyToken,
    errorMiddleware,
    carController.fetchCars
  );
  // Get detailed information about specific car
  app.get(
    `${version}${resource}/:id`,
    carMiddleware.validateParamId,
    common.verifyToken,
    errorMiddleware,
    carController.fetchCars
  );
  app.patch(
    `${version}${resource}/:id`,
    carMiddleware.validateUpdateCarParams,
    carMiddleware.validateParamId,
    common.verifyToken,
    errorMiddleware,
    carController.updateCars
  );
  app.delete(
    `${version}${resource}/:id`,
    carMiddleware.validateParamId,
    common.verifyToken,
    errorMiddleware,
    carController.deleteCar
  );
};

