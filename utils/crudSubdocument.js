const query = require("./db");

const getMany = (parentModel, property) => async (req, res) => {
  try {
    const parentDoc = await query.getOne(parentModel, req.params.collectionId);

    if (!parentDoc) {
      res
        .status(404)
        .send(`Collection with id ${req.params.collectionId} does not exist`);
    } else if (!parentDoc[property]) {
      res.status(404).end();
    } else {
      res.status(200).json({ data: parentDoc[property] });
    }
  } catch (e) {
    res.status(400).end();
  }
};

const getOne = (parentModel, property) => async (req, res) => {
  try {
    const parentDoc = await query.getOne(parentModel, req.params.collectionId);

    if (!parentDoc) {
      return res.status(404).end();
    }

    if (!parentDoc[property]) {
      return res.status(404).end();
    }

    const child = parentDoc[property].id(req.params.flashcardId);
    if (!child) {
      return res.status(404).end();
    }

    return res
      .status(200)
      .json({ data: parentDoc[property].id(req.params.flashcardId) });
  } catch (e) {
    res.status(500).end();
  }
};

const createOne = (parentModel, childModel, property) => async (req, res) => {
  try {
    let parentDoc = await query.getOne(parentModel, req.params.collectionId);

    if (!parentDoc) {
      res.status(404).end();
    }

    const child = new childModel({ ...req.body });

    parentDoc[property].push(child);

    parentDoc = await parentDoc.save();

    res.status(200).json({ data: parentDoc });
  } catch (error) {
    res.status(500).send(req.params.collectionId);
  }
};

const updateOne = (parentModel, property) => async (req, res) => {
  try {
    let parentDoc = await query.getOne(parentModel, req.params.collectionId);
    if (!parentDoc) {
      return res.status(404).end();
    }

    const child = parentDoc[property].id(req.params.flashcardId);

    if (!child) {
      return res.status(404).end();
    }

    Object.keys(req.body).forEach((key) => {
      child[key] = req.body[key];
    });
    parentDoc = await parentDoc.save();

    return res.status(200).json({ data: parentDoc });
  } catch (error) {
    return res.status(400).send(`${req.params.collectionId}`);
  }
};

const removeOne = (parentModel, childModel, property) => async (req, res) => {
  try {
    const parentDoc = await query.getOne(parentModel, req.params.collectionId);

    if (!parentDoc) {
      return res.status(404).end();
    }

    let child = parentDoc[property].id(req.params.flashcardId);
    if (!child) {
      return res.status(404).end();
    }

    child = await child.remove();
    await parentDoc.save();
    return res.status(200).json({ data: child });
  } catch (error) {
    return res.status(400).end();
  }
};

module.exports = crudControllers = (parentModel, childModel, property) => ({
  getMany: getMany(parentModel, property),
  getOne: getOne(parentModel, property),
  createOne: createOne(parentModel, childModel, property),
  updateOne: updateOne(parentModel, property),
  removeOne: removeOne(parentModel, childModel, property),
});
