const query = require("./db");

const getOne = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await query.getOne(model, id);

    if (!doc) {
      return res.status(404).json({
        data: {
          error: `The ${model.modelName} with id '${id}' does not exist`,
        },
      });
    }

    if (doc instanceof Error) return res.status(400).json({ data: doc });

    return res.status(200).json({ data: doc });
  } catch (err) {
    return res.status(500).json({ data: err });
  }
};

const getAll = (model) => async (req, res) => {
  try {
    const docs = await query.getAll(model);

    return res.status(200).json({ data: docs });
  } catch (err) {
    return res.status(500).json({ data: err });
  }
};

const createOne = (model) => async (req, res) => {
  try {
    const doc = await query.createOne(model, req.body);

    if (doc instanceof Error)
      return res.status(400).json({ data: { error: "Invalid parameters" } });

    return res.status(201).json({ data: doc });
  } catch (err) {
    return res.status(500).json({ data: err });
  }
};

const updateOne = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDoc = await query.updateOne(model, id, req.body);

    if (updatedDoc instanceof Error)
      return res.status(400).json({ data: { error: "Invalid params" } });

    if (!updatedDoc)
      return res.status(404).json({
        data: {
          error: `The ${model.modelName} with id '${id}' does not exist`,
        },
      });

    res.status(200).json({ data: updatedDoc });
  } catch (err) {
    res.status(500).json({ data: err });
  }
};

const removeOne = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await query.removeOne(model, id);

    if (removed instanceof Error)
      return res.status(400).json({ data: removed });

    if (!removed)
      return res.status(404).json({
        data: {
          error: `The ${model.modelName} with id '${id}' does not exist`,
        },
      });

    return res.status(200).json({ data: removed });
  } catch (err) {
    return res.status(500).json({ data: err });
  }
};

module.exports = crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getAll: getAll(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
