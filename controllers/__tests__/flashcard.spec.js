const { Collection } = require("../../models/collection");
const { Flashcard } = require("../../models/flashcard");
const query = require("../../utils/db");
const testData = require("../../testData");
const flashcardController = require("../../controllers/flashcardController");
const mongoose = require("mongoose");
const clearDB = require("../../test-db-setup");

describe("test with data", () => {
  beforeAll(async () => {
    return await Collection.create(testData);
  });

  test("Add flashcard to collection", async () => {
    const collections = await query.getAll(Collection);

    const req = {
      params: {
        collectionId: collections[0]._id,
      },
      body: {
        question: "What is a test?",
        answer: "A way to make sure something works.",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    const result = await flashcardController.createOne(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.status).toBeCalledTimes(1);
  });
});
