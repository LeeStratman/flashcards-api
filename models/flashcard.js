const mongoose = require("mongoose");
const Joi = require("joi");

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

const validateFlashcard = (req, res, next) => {
  const schema = Joi.object({
    question: Joi.string().min(1).required(),
    answer: Joi.string().min(1).required(),
  });

  if (schema.validate(req.body)) {
    next();
  } else {
    res.status(400).end();
  }
};

module.exports = { Flashcard, validateFlashcard };
