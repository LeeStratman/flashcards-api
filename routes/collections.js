const collectionController = require("../controllers/collectionController");
const { validateCollection } = require("../models/collection");
const { Router } = require("express");
const router = Router();

router
  .route("/")
  .get(collectionController.getAll)
  .post(validateCollection, collectionController.createOne);

router
  .route("/:id")
  .get(collectionController.getOne)
  .put(collectionController.updateOne)
  .delete(collectionController.removeOne);

module.exports = router;
