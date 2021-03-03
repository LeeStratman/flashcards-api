const mongoose = require("mongoose");

const flashclardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const Flashcard = mongoose.model("Flashcard", flashclardSchema);

module.exports = Flashcard;
