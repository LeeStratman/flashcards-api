const flashcardController = require("../controllers/flashcardController");
const { validateFlashcard } = require("../models/flashcard");
const { Router } = require("express");
const router = Router();

router
  .route("/:collectionId/flashcards")
  .get(flashcardController.getMany)
  .post(validateFlashcard, flashcardController.createOne);

router
  .route("/:collectionId/flashcards/:flashcardId")
  .get(flashcardController.getOne)
  .put(validateFlashcard, flashcardController.updateOne)
  .delete(flashcardController.removeOne);

module.exports = router;
