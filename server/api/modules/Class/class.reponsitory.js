const mongoose = require("mongoose");

const CLassSchema = mongoose.Schema({
  Malop: String,
  Tenmonhoc: String,
  Magv: String
});

const ClassModel = mongoose.model("Class", ClassSchema);

const find = async function(query) {
  if (query.limit && query.skip !== undefined) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.limit;
    delete query.skip; 
    return await ClassModel.find(query)
    .populate("student")
      .limit(limit)
      .skip(skip);
  }
  return await ClassModel.find(query).populate("teacher");
};

const count = async function(query) {
  return await ClassModel.count(query);
};

const findById = async function(id) {
  return await ClassModel.findById(id);
};

const create = async function(data) {
  const newDocument = new ClassModel(data);
  return await newDocument.save();
};
const update = async function(id, data) {
  return await ClassModel.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { new: true }
  );
};

const deleteById = async function(id) {
  return await ClassModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  count: count,
  findById: findById,
  create: create,
  update: update,
  delete: deleteById
};
