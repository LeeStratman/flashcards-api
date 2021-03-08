const mongoose = require("mongoose");
const { Flashcard } = require("./flashcard");
const Joi = require("joi");

const collectionSchema = mongoose.Schema({
  name: { type: String, required: true },
  flashcards: [Flashcard.schema],
});

const Collection = mongoose.model("Collection", collectionSchema);

const validateCollection = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
  });

  if (schema.validate(req.body)) {
    next();
  } else {
    res.status(400).end();
  }
};

module.exports = { Collection, validateCollection };
