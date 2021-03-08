const { Collection } = require("../models/collection");
const crudController = require("../utils/crud");

module.exports = crudController(Collection);
