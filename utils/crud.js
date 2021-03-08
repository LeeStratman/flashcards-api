const query = require("./db");

const getOne = (model) => async (req, res) => {
  try {
    const doc = await query.getOne(model, req.params.id);

    if (!doc) {
      res.status(400).end();
    } else {
      res.status(200).json({ data: doc });
    }
  } catch (e) {
    res.status(400).end();
  }
};

const getAll = (model) => async (req, res) => {
  try {
    const docs = await query.getAll(model);

    if (!docs) {
      res.status(400).end();
    } else if (docs.length === 0) {
      res.status(404).json({ data: docs }).end();
    } else {
      res.status(200).json({ data: docs });
    }
  } catch (e) {
    res.status(500).end();
  }
};

const createOne = (model) => async (req, res) => {
  try {
    const doc = await query.createOne(model, req.body);
    if (!doc) {
      res.status(400).end();
    } else {
      res.status(201).json({ data: doc });
    }
  } catch (e) {
    res.status(400).end();
  }
};

const updateOne = (model) => async (req, res) => {
  try {
    const updatedDoc = await query.updateOne(model, req, params.id, req.body);

    if (!updatedDoc) {
      res.status(400).end();
    } else {
      res.status(200).json({ data: updatedDoc });
    }
  } catch (e) {
    res.status(500).end();
  }
};

const removeOne = (model) => async (req, res) => {
  try {
    const removed = await query.removeOne(model, req.params.id);

    if (!removed) {
      return res.status(404).end();
    }

    return res.status(200).json({ data: removed });
  } catch (e) {
    res.status(400).end();
  }
};

module.exports = crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getAll: getAll(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
