const Collection = require("../models/collection");

const getCollectionById = (id) => {
  return Collection.findById(id);
};

const getAllCollections = () => {
  return Collection.find();
};

module.exports = {
  getAllCollections,
  getCollectionById,
};
