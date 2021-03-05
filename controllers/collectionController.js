const Collection = require("../models/collection");
const crudControllers = require("./crud");

module.exports = crudControllers(Collection);
