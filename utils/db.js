const getOne = async (model, id) => {
  try {
    return await model.findOne({ _id: id }).exec();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const getAll = async (model) => {
  try {
    return await model.find({}).exec();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const createOne = async (model, fields) => {
  try {
    return await model.create({ ...fields });
  } catch (error) {
    console.error(error);
    return undefined;
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
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const removeOne = async (model, id) => {
  try {
    return await model.findOneAndRemove({
      _id: id,
    });
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

module.exports = {
  getOne,
  getAll,
  createOne,
  updateOne,
  removeOne,
};
