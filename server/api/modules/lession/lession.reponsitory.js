const mongoose = require("mongoose");

const LessionSchema = mongoose.Schema({
  lession: String,
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student"
    }
  ],
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher"
    }
  ]
});

const LessionModel = mongoose.model("Lession", LessionSchema);

const find = async function(query) {
  if (query.limit && query.skip !== undefined) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.limit;
    delete query.skip;
    return await LessionModel.find(query)
    .populate("student")
      .limit(limit)
      .skip(skip);
  }
  return await LessionModel.find(query).populate("teacher");
};

const count = async function(query) {
  return await LessionModel.count(query);
};

const findById = async function(id) {
  return await LessionModel.findById(id);
};

const create = async function(data) {
  const newDocument = new LessionModel(data);
  return await newDocument.save();
};
const update = async function(id, data) {
  return await LessionModel.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { new: true }
  );
};

const deleteById = async function(id) {
  return await LessionModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  count: count,
  findById: findById,
  create: create,
  update: update,
  delete: deleteById
};
