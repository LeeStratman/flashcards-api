const getOne = async (model, id) => {
  try {
    return await model.findById(id).exec();
  } catch (err) {
    return err;
  }
};

const getAll = async (model) => {
  try {
    return await model.find({}).exec();
  } catch (err) {
    return err;
  }
};

const createOne = async (model, fields) => {
  try {
    return await model.create({ ...fields });
  } catch (err) {
    return err;
  }
};

const updateOne = async (model, id, params) => {
  try {
    return await model.findOneAndUpdate(
      {
        _id: id,
      },
      params,
      { new: true }
    );
  } catch (err) {
    return err;
  }
};

const removeOne = async (model, id) => {
  try {
    return await model.findOneAndRemove({
      _id: id,
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  getOne,
  getAll,
  createOne,
  updateOne,
  removeOne,
};
