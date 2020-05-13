const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  Maphong: String,
  Tenphong: String
});

const RoomModel = mongoose.model("Room", RoomSchema);

const find = async function(query) {
  if (query.limit && query.skip !== undefined) {
    const limit = Number(query.limit);
    const skip = Number(query.skip);
    delete query.limit;
    delete query.skip; 
    return await RoomModel.find(query)
    .populate("student")
      .limit(limit)
      .skip(skip);
  }
  return await RoomModel.find(query).populate("teacher");
};

const count = async function(query) {
  return await RoomModel.count(query);
};

const findById = async function(id) {
  return await RoomModel.findById(id);
};

const create = async function(data) {
  const newDocument = new RoomModel(data);
  return await newDocument.save();
};
const update = async function(id, data) {
  return await RoomModel.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { new: true }
  );
};

const deleteById = async function(id) {
  return await RoomModel.findByIdAndDelete(id);
};

module.exports = {
  find: find,
  count: count,
  findById: findById,
  create: create,
  update: update,
  delete: deleteById
};
