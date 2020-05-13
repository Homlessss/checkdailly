 const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
  Magv: String,
  Tengv: String,
  Chuyenmon: String,
  Khoa: String
});

const TeacherModel = mongoose.model("Teacher", TeacherSchema);

const find = async function(query) {
  if (query.limit && query.skip !== undefined) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.limit;
    delete query.skip;
    return await TeacherModel.find(query)
      .limit(limit)
      .skip(skip);
  }
  return await TeacherModel.find(query);
};

const count = async function(query) {
  return await TeacherModel.count(query);
};

const findById = async function(id) {
  return await TeacherModel.findById(id);
};

const create = async function(data) {
  const newDocument = new TeacherModel(data);
  return await newDocument.save();
};
const update = async function(id, data) {
  return await TeacherModel.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { new: true }
  );
};

const deleteById = async function(id) {
  return await TeacherModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  count: count,
  findById: findById,
  create: create,
  update: update,
  delete: deleteById
};
