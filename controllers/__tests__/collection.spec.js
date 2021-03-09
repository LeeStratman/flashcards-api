const { Collection } = require("../../models/collection");
const query = require("../../utils/db");
const testData = require("../../testData");
const collectionController = require("../../controllers/collectionController");
const mongoose = require("mongoose");
const clearDB = require("../../test-db-setup");

describe("test without data", () => {
  beforeEach(async () => {
    return await clearDB(mongoose.connection);
  });
  test("get all collections", async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    await collectionController.getAll(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ data: [] });
    expect(res.json).toBeCalledTimes(1);
  });

  test("add a collection", async () => {
    const req = {
      body: {
        name: "New Collection",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    await collectionController.createOne(req, res);

    expect(res.status).toBeCalledWith(201);
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
  });

  test("add a collection with invalid name", async () => {
    const req = {
      body: {
        name: "",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    const next = jest.fn(() => next);

    await collectionController.createOne(req, res, next);

    expect(next).toBeCalledTimes(1);
  });
});

describe("test with data", () => {
  beforeAll(async () => {
    return await Collection.create(testData);
  });

  test("get all collections", async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    await collectionController.getAll(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
  });

  test("get collection by id", async () => {
    const collections = await query.getAll(Collection);

    const req = {
      params: {
        id: collections[0]._id,
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    await collectionController.getOne(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
  });

  test("get non-existent collection", async () => {
    const req = {
      params: {
        id: "000000000000000000000000",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    await collectionController.getOne(req, res);
    expect(res.status).toBeCalledWith(404);
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      data: {
        error: `The ${Collection.modelName} with id '${req.params.id}' does not exist`,
      },
    });
  });

  test("get collection with invalid id", async () => {
    const req = {
      params: {
        id: "",
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    const next = jest.fn(() => next);

    await collectionController.getOne(req, res, next);

    expect(res.status).toBeCalledTimes(0);
  });

  test("update a collection by id", async () => {
    const collections = await query.getAll(Collection);

    const req = {
      params: {
        id: collections[0]._id,
      },
      body: {
        name: "Modern Physics",
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    await collectionController.updateOne(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
  });

  test("update a collection with invalid id", async () => {
    const req = {
      params: {
        id: "",
      },
      body: {
        name: "Modern Physics",
      },
    };

    const res = {};

    const next = jest.fn(() => next);

    await collectionController.updateOne(req, res, next);

    expect(next).toBeCalledTimes(1);
  });

  test("update a non-existing collection with id", async () => {
    const req = {
      params: {
        id: "000000000000000000000000",
      },
      body: {
        name: "Modern Physics",
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    await collectionController.updateOne(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
  });

  test("remove a non-existing collection with id", async () => {
    const req = {
      params: {
        id: "000000000000000000000000",
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    const next = jest.fn(() => next);

    await collectionController.removeOne(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledWith(404);
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
  });

  test("remove a collection with invalid id", async () => {
    const req = {
      params: {
        id: "",
      },
    };

    const res = {};

    const next = jest.fn(() => next);

    await collectionController.removeOne(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(expect.any(Error));
  });

  test("remove a collection", async () => {
    const collections = await query.getAll(Collection);

    const req = {
      params: {
        id: collections[0]._id,
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };

    await collectionController.removeOne(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.status).toBeCalledTimes(1);
    expect(res.json).toBeCalledTimes(1);
  });
});
