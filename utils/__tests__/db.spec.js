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
    try {
      await query.createOne(Collection, {});
    } catch (err) {
      console.log(err);
      expect(err._message).toBe("Collection validation failed");
    }
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

  test("get non-existent collection", async () => {
    const collection = await query.getOne(
      Collection,
      "000000000000000000000000"
    );
    expect(collection).toBe(null);
  });

  test("get collection with invalid id", async () => {
    try {
      await query.getOne(Collection, "");
    } catch (err) {
      expect(err).toStrictEqual(expect.any(Error));
    }
  });

  test("get all collections", async () => {
    const collections = await query.getAll(Collection);
    expect(collections).toBeTruthy();
  });

  test("update collection", async () => {
    const collections = await query.getAll(Collection);
    const updateCollection = await query.updateOne(
      Collection,
      collections[0]._id,
      { name: "Modern Physics" }
    );
    expect(updateCollection).toBeTruthy();
  });

  test("update collection without a name", async () => {
    const collections = await query.getAll(Collection);
    const updateCollection = await query.updateOne(
      Collection,
      collections[0]._id,
      {}
    );
    expect(updateCollection).toBeTruthy();
  });
  test("update collection with invalid id", async () => {
    try {
      await query.getAll(Collection);
      await query.updateOne(Collection, "", {});
    } catch (err) {
      expect(err).toStrictEqual(expect.any(Error));
    }
  });

  test("update non-existent collection", async () => {
    await query.getAll(Collection);
    const updateCollection = await query.updateOne(
      Collection,
      "000000000000000000000000",
      {}
    );
    expect(updateCollection).toBe(null);
  });

  test("remove collection", async () => {
    const collections = await query.getAll(Collection);
    const removeCollection = await query.removeOne(
      Collection,
      collections[0]._id
    );

    expect(removeCollection).toBeTruthy();
  });

  test("remove collection with invalid id", async () => {
    try {
      await query.getAll(Collection);
      await query.removeOne(Collection, "");
    } catch (err) {
      expect(err).toStrictEqual(expect.any(Error));
    }
  });

  test("remove non-existent collection", async () => {
    const removeCollection = await query.removeOne(
      Collection,
      "000000000000000000000000"
    );

    expect(removeCollection.deletedCount).toBe(0);
  });
});
