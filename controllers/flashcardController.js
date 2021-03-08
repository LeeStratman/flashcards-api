const { Collection } = require("../models/collection");
const { Flashcard } = require("../models/flashcard");
const crudController = require("../utils/crudSubDocument");

module.exports = crudController(Collection, Flashcard, "flashcards");
