const mongoose = require("mongoose");

const LessonSchema = mongoose.Schema({
  Matiethoc: String,
  Tietbd: Number,
  Tietkt: Number,
});

const LessonModel = mongoose.model("Lesson", LessonSchema);

const find = async function(query) {
  if (query.limit && query.skip !== undefined) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.limit;
    delete query.skip; 
    return await LessonModel.find(query)
    .populate("student")
      .limit(limit)
      .skip(skip);
  }
  return await LessonModel.find(query).populate("teacher");
};

const count = async function(query) {
  return await LessonModel.count(query);
};

const findById = async function(id) {
  return await LessonModel.findById(id);
};

const create = async function(data) {
  const newDocument = new LessonModel(data);
  return await newDocument.save();
};
const update = async function(id, data) {
  return await LessonModel.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { new: true }
  );
};

const deleteById = async function(id) {
  return await LessonModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  count: count,
  findById: findById,
  create: create,
  update: update,
  delete: deleteById
};
