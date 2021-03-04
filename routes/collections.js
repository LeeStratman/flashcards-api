const collectionController = require("../controllers/collectionController");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  collectionController
    .getAllCollections()
    .then((collections) => res.send(collections))
    .catch((err) => res.status(500).send(`Internal Server Error: ${err}`));
});

router.get("/:id", async (req, res) => {
  try {
    const collection = await collectionController.getCollectionById(
      req.params.id
    );

    if (!collection)
      return res
        .status(400)
        .send(`The collection with id ${req.params.id} does not exist`);

    return res.send(collection);
  } catch (err) {
    res.status(500).send(`Internal Server Error: ${err}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const collection = {
      name: req.body.name,
      flashcards: req.body.flashcards,
    };

    const addedCollection = await collectionController.createCollection(
      collection
    );

    return res.send(addedCollection);
  } catch (err) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
