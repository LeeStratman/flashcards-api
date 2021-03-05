const Collection = require("../../models/collection");
const collectionController = require("../collectionController");
const crudControllers = require("../crud");

describe("Collection crud", () => {
  describe("getAllCollections", () => {
    test("when DB is empty", async () => {
      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      const response = await collectionController.getAll(req, res);

      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ data: [] });
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    test("when DB isn't empty", async () => {
      const collectionToAdd = [{ name: "name" }];

      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      const response = await Collection.create(collectionToAdd);
      const myCollections = await Collection.find({}).lean().exec();
      await collectionController.getAll(req, res);

      expect(res.json).toHaveBeenCalledWith({ data: myCollections });
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.end).toHaveBeenCalledTimes(0);
    });
  });

  describe("getCollectionById", () => {
    test("when collection exists", async () => {
      const existingCollection = await Collection.create({ name: "name" });

      const req = {
        params: {
          id: existingCollection._id,
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      const collection = await Collection.findOne({
        _id: existingCollection._id,
      })
        .lean()
        .exec();

      await collectionController.getOne(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ data: collection });
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("when collection doesn't exist", async () => {
      const req = {
        params: {
          id: "000000000000000000000000",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      await collectionController.getOne(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.end).toHaveBeenCalledTimes(1);
      expect(res.json).not.toHaveBeenCalled();
    });

    test("with invalid id", async () => {
      const req = {
        params: {
          id: "1",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      await collectionController.getOne(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.end).toHaveBeenCalledTimes(1);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("createCollection", () => {
    test("add a new collection", async () => {
      const req = { body: { name: "name" } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      await collectionController.createOne(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    test("missing required fields", async () => {
      const req = { body: { notName: "name" } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      const response = await collectionController.createOne(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(0);
    });
  });

  describe("updateOne", () => {
    test("existing collection", async () => {
      await Collection.create({ name: "name" });

      const collection = await Collection.find({}).lean().exec();
      console.log(collection[0]);

      const req = {
        params: { id: collection[0]._id },
        body: {
          name: "new name",
          flashcards: collection[0].flashcards,
          newField: "new field",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      await collectionController.updateOne(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status).toHaveBeenCalledTimes(1);
    });

    test("a non-existing collection", async () => {
      const req = {
        params: { id: "000000000000000000000000" },
        body: {
          name: "new name",
          flashcards: [],
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      await collectionController.updateOne(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status).toHaveBeenCalledTimes(1);
    });
  });

  describe("removeCollection", () => {
    test("when collection exists", async () => {
      await Collection.create({ name: "name" });

      const collection = await Collection.find({}).lean().exec();

      const req = {
        params: { id: collection[0]._id },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      await collectionController.removeOne(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status).toHaveBeenCalledTimes(1);
    });

    test("when collection doesn't exist", async () => {
      const req = {
        params: { id: "000000000000000000000000" },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      await collectionController.removeOne(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.status).toHaveBeenCalledTimes(1);
    });

    test("when invalid id", async () => {
      const req = {
        params: { id: "a" },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      await collectionController.removeOne(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status).toHaveBeenCalledTimes(1);
    });

    test("when no id is provided", async () => {
      const req = {
        params: {},
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
        end: jest.fn(() => res),
      };

      await collectionController.removeOne(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.status).toHaveBeenCalledTimes(1);
    });
  });
});
