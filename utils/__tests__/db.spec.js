const { Collection } = require("../../models/collection");
const testData = require("../../testData");
const query = require("../db");
const mongoose = require("mongoose");
const clearDB = require("../../test-db-setup");

describe("test without data", () => {
  beforeEach(async () => {
    return await clearDB(mongoose.connection);
  });
  test("get all collections", async () => {
    const collections = await query.getAll(Collection);
    expect(collections).toStrictEqual([]);
  });

  test("create an empty collection", async () => {
    const newCollection = await query.createOne(Collection, {
      name: "New Collection",
    });
    expect(newCollection).toBeTruthy();
    expect(newCollection.flashcards).toHaveLength(0);
  });

  test("create a collection without a name", async () => {
    const newCollection = await query.createOne(Collection, {});
    expect(newCollection).toStrictEqual(expect.any(Error));
  });
});

describe("test with data", () => {
  beforeAll(async () => {
    return await Collection.create(testData);
  });
  test("get collection by id", async () => {
    const collections = await query.getAll(Collection);
    const collection = await query.getOne(Collection, collections[0]._id);
    expect(collection).toBeTruthy();
  });

  test("get a non-existent collection", async () => {
    const collection = await query.getOne(
      Collection,
      "000000000000000000000000"
    );
    expect(collection).toBe(null);
  });

  test("get a collection with invalid id", async () => {
    const collection = await query.getOne(Collection, "");
    expect(collection).toStrictEqual(expect.any(Error));
  });

  test("get all collections", async () => {
    const collections = await query.getAll(Collection);
    expect(collections).toBeTruthy();
  });

  test("update a collection", async () => {
    const collections = await query.getAll(Collection);
    const updateCollection = await query.updateOne(
      Collection,
      collections[0]._id,
      { name: "Modern Physics" }
    );
    expect(updateCollection).toBeTruthy();
  });

  test("update a collection without a name", async () => {
    const collections = await query.getAll(Collection);
    const updateCollection = await query.updateOne(
      Collection,
      collections[0]._id,
      {}
    );
    expect(updateCollection).toBeTruthy();
  });
  test("update a collection with invalid id", async () => {
    const collections = await query.getAll(Collection);
    const updateCollection = await query.updateOne(Collection, "", {});
    expect(updateCollection).toStrictEqual(expect.any(Error));
  });

  test("update a non-existent collection", async () => {
    const collections = await query.getAll(Collection);
    const updateCollection = await query.updateOne(
      Collection,
      "000000000000000000000000",
      {}
    );
    expect(updateCollection).toBe(null);
  });

  test("remove a collection", async () => {
    const collections = await query.getAll(Collection);
    const removeCollection = await query.removeOne(
      Collection,
      collections[0]._id
    );

    expect(removeCollection).toBeTruthy();
  });

  test("remove a collection with invalid id", async () => {
    const collections = await query.getAll(Collection);
    const removeCollection = await query.removeOne(Collection, "");

    expect(removeCollection).toStrictEqual(expect.any(Error));
  });

  test("remove a non-existent collection", async () => {
    const removeCollection = await query.removeOne(
      Collection,
      "000000000000000000000000"
    );

    expect(removeCollection).toBe(null);
  });
});
