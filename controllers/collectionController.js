const Collection = require("../models/collection");

const getCollectionById = (id) => {
  return Collection.findById(id);
};

const getAllCollections = () => {
  return Collection.find();
};

const createCollection = (collection) => {
  return Collection.create(collection);
};

module.exports = {
  getAllCollections,
  getCollectionById,
  createCollection,
};
