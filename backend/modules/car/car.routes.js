// App dependencies
const errorMiddleware = require("../common/error-middleware");
const common = require("../common/common");
const userController = require("./car.controller");
const userMiddleware = require("./car.middleware");

const resource = "/car";

module.exports = function (app, version) {
  /**
   * Category CRUD Operations
   */
  app.post(
    `${version}${resource}/category`,
    userMiddleware.category,
    common.verifyToken,
    errorMiddleware,
    userController.createCategory
  );
  app.get(
    `${version}${resource}/category`,
    common.verifyToken,
    errorMiddleware,
    userController.fetchCategories
  );
  app.put(
    `${version}${resource}/category/:id`,
    userMiddleware.validateParamId,
    userMiddleware.category,
    common.verifyToken,
    errorMiddleware,
    userController.updateCategory
  );
  app.delete(
    `${version}${resource}/category/:id`,
    userMiddleware.validateParamId,
    common.verifyToken,
    errorMiddleware,
    userController.deleteCategory
  );

  /**
   * Car CRUD Operations
   */
  app.post(
    `${version}${resource}`,
    userMiddleware.validateLoginParams,
    common.verifyToken,
    errorMiddleware,
    userController.addCar
  );
  app.get(
    `${version}${resource}`,
    common.verifyToken,
    errorMiddleware,
    userController.fetchCars
  );
  // Get detailed information about specific car
  app.get(
    `${version}${resource}/:id`,
    common.verifyToken,
    errorMiddleware,
    userController.fetchCars
  );
  app.patch(
    `${version}${resource}/:id`,
    common.verifyToken,
    errorMiddleware,
    userController.updateCars
  );
  app.delete(
    `${version}${resource}/:id`,
    common.verifyToken,
    errorMiddleware,
    userController.deleteCar
  );
};

