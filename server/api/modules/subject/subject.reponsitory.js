const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
  Mamonhoc: String,
  Tenmonhoc: String,
  Tietlythuyet: Number,
  Tietthuchanh: Number
});

const SubjectModel = mongoose.model("Subject", SubjectSchema);

const find = async function(query) {
  if (query.limit && query.skip !== undefined) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.limit;
    delete query.skip;
    return await SubjectModel.find(query)
      .limit(limit)
      .skip(skip);
  }
  return await SubjectModel.find(query);
};

const count = async function(query) {
  return await SubjectModel.count(query);
};

const findById = async function(id) {
  return await SubjectModel.findById(id);
};

const create = async function(data) {
  const newDocument = new SubjectModel(data);
  return await newDocument.save();
};
const update = async function(id, data) {
  return await SubjectModel.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { new: true }
  );
};

const deleteById = async function(id) {
  return await SubjectModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  count: count,
  findById: findById,
  create: create,
  update: update,
  delete: deleteById
};
