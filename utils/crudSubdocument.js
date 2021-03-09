const query = require("./db");

const getMany = (parentModel, property) => async (req, res, next) => {
  try {
    const parentDoc = await query.getOne(parentModel, req.params.collectionId);

    if (!parentDoc)
      return res.status(404).json({
        data: {
          error: `Collection with id ${req.params.collectionId} does not exist`,
        },
      });

    if (!parentDoc[property])
      throw new Error(`${property} does not exist in ${parentModel.modelName}`);

    res.status(200).json({ data: parentDoc[property] });
  } catch (err) {
    return next(err);
  }
};

const getOne = (parentModel, property) => async (req, res, next) => {
  try {
    const parentDoc = await query.getOne(parentModel, req.params.collectionId);

    if (!parentDoc)
      return res.status(404).json({
        data: {
          error: `Collection with id ${req.params.collectionId} does not exist`,
        },
      });

    if (!parentDoc[property])
      throw new Error(`${property} does not exist in ${parentModel.modelName}`);

    const child = parentDoc[property].id(req.params.flashcardId);

    if (!child)
      return res.status(404).json({
        data: {
          error: `${property} with id ${req.params.collectionId} does not exist`,
        },
      });

    return res
      .status(200)
      .json({ data: parentDoc[property].id(req.params.flashcardId) });
  } catch (err) {
    return next(err);
  }
};

const createOne = (parentModel, childModel, property) => async (
  req,
  res,
  next
) => {
  const id = req.params.collectionId;
  try {
    let parentDoc = await query.getOne(parentModel, id);

    if (!parentDoc) {
      return res.status(404).json({
        data: {
          error: `The ${parentModel.modelName} with id '${id}' does not exist`,
        },
      });
    }

    const child = new childModel({ ...req.body });

    parentDoc[property].push(child);

    parentDoc = await parentDoc.save();

    res.status(200).json({ data: parentDoc });
  } catch (err) {
    return next(err);
  }
};

const updateOne = (parentModel, property) => async (req, res, next) => {
  const id = req.params.collectionId;
  try {
    let parentDoc = await query.getOne(parentModel, id);

    if (!parentDoc) {
      return res.status(404).json({
        data: {
          error: `The ${parentModel.modelName} with id '${id}' does not exist`,
        },
      });
    }

    const child = parentDoc[property].id(req.params.flashcardId);

    if (!child)
      return res.status(404).json({
        data: {
          error: `${property} with id ${req.params.collectionId} does not exist`,
        },
      });

    Object.keys(req.body).forEach((key) => {
      child[key] = req.body[key];
    });

    parentDoc = await parentDoc.save();

    return res.status(200).json({ data: parentDoc });
  } catch (err) {
    return next(err);
  }
};

const removeOne = (parentModel, childModel, property) => async (
  req,
  res,
  next
) => {
  const id = req.params.collectionId;
  try {
    const parentDoc = await query.getOne(parentModel, id);

    if (!parentDoc) {
      return res.status(404).json({
        data: {
          error: `The ${parentModel.modelName} with id '${id}' does not exist`,
        },
      });
    }

    let child = parentDoc[property].id(req.params.flashcardId);

    if (!child)
      return res.status(404).json({
        data: {
          error: `${property} with id ${req.params.collectionId} does not exist`,
        },
      });

    child = await child.remove();
    await parentDoc.save();

    return res.status(200).json({ data: child });
  } catch (err) {
    return next(err);
  }
};

module.exports = (parentModel, childModel, property) => ({
  getMany: getMany(parentModel, property),
  getOne: getOne(parentModel, property),
  createOne: createOne(parentModel, childModel, property),
  updateOne: updateOne(parentModel, property),
  removeOne: removeOne(parentModel, childModel, property),
});
