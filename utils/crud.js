const query = require("./db");

const getOne = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query.getOne(model, id);

    if (!result) {
      return res.status(404).json({
        data: {
          error: `The ${model.modelName} with id '${id}' does not exist`,
        },
      });
    }

    if (result instanceof Error)
      return res.status(400).json({ data: { error: result.message } });

    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(500).json({ data: { error: err.message } });
  }
};

const getAll = (model) => async (req, res) => {
  try {
    const result = await query.getAll(model);

    if (result instanceof Error)
      return res.status(400).json({ data: { error: result.message } });

    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(500).json({ data: { error: err.message } });
  }
};

const createOne = (model) => async (req, res) => {
  try {
    const result = await query.createOne(model, req.body);

    if (result instanceof Error)
      return res.status(400).json({ data: { error: result.message } });

    return res.status(201).json({ data: result });
  } catch (err) {
    return res.status(500).json({ data: { error: err.message } });
  }
};

const updateOne = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query.updateOne(model, id, req.body);

    if (result instanceof Error)
      return res.status(400).json({ data: { error: result.message } });

    if (!result)
      return res.status(404).json({
        data: {
          error: `The ${model.modelName} with id '${id}' does not exist`,
        },
      });

    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ data: { error: err.message } });
  }
};

const removeOne = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query.removeOne(model, id);

    if (result instanceof Error)
      return res.status(400).json({ data: { error: result.message } });

    if (!result)
      return res.status(404).json({
        data: {
          error: `The ${model.modelName} with id '${id}' does not exist`,
        },
      });

    return res.status(200).json({ data: result });
  } catch (err) {
    return res.status(500).json({ data: { error: err.message } });
  }
};

module.exports = crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getAll: getAll(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
