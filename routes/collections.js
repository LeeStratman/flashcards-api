const collectionController = require("../controllers/collectionController");
const flashcardController = require("../controllers/flashcardController");
const Flashcard = require("../models/flashcard");
const { Router } = require("express");
const router = Router();

router
  .route("/")
  .get(collectionController.getMany)
  .post(collectionController.createOne);

router.route("/:id").get(collectionController.getOne);

router.route("/:parentId/flashcards").post(flashcardController.getMany);

module.exports = router;
