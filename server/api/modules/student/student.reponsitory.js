const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  Tensv: String,
  MSV: String,
  Lop: String,
  Ngaysinh: Date,
  Gioitinh: String
});

const StudentModel = mongoose.model("Student", StudentSchema);

const find = async function(query) {
  if (query.limit && query.skip !== undefined) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.limit;
    delete query.skip;
    return await StudentModel.find(query)
      .limit(limit)
      .skip(skip);
  }
  return await StudentModel.find(query);
};

const count = async function(query) {
  return await StudentModel.count(query);
};

const findById = async function(id) {
  return await StudentModel.findById(id);
};

const create = async function(data) {
  const newDocument = new StudentModel(data);
  return await newDocument.save();
};
const update = async function(id, data) {
  return await StudentModel.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { new: true }
  );
};

const deleteById = async function(id) {
  return await StudentModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  count: count,
  findById: findById,
  create: create,
  update: update,
  delete: deleteById
};
