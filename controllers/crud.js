const getOne = (model) => async (req, res) => {
  try {
    const doc = await model.findOne({ _id: req.params.id }).lean().exec();

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
    const docs = await model.find({}).lean().exec();

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
    const doc = await model.create({ ...req.body });
    res.status(201).json({ data: doc });
  } catch (e) {
    res.status(400).end();
  }
};

const updateOne = (model) => async (req, res) => {
  try {
    const updatedDoc = await model.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    );

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
    const removed = await model.findOneAndRemove({
      _id: req.params.id,
    });

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
