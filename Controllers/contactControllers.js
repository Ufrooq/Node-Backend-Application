const asyncHandler = require("express-async-handler");
const contactModel = require("../model/contactModel");

const getAllContact = asyncHandler(async (req, res) => {
  const getData_from_DB = await contactModel.find({ user_id: req.user.id });
  res.status(200).json(getData_from_DB);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`No such data found with id :${req.params.id}`);
  }
  res.status(200).json(contact);
});

const postContact = asyncHandler(async (req, res) => {
  const { name, age, gender } = req.body;
  if (!name || !age || !gender) {
    res.status(400);
    throw new Error("Please fill out all the required fields !!");
  }
  const insertContact_into_DB = await contactModel.create({
    name,
    age,
    gender,
    user_id: req.user.id,
  });
  res.status(201).json(insertContact_into_DB);
});

const putContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("User not found !!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User is not Authorized !!");
  }
  const updatedContact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("User not found !!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User is not Authorized !!");
  }
  const contactToDelete = await contactModel.findByIdAndDelete(req.params.id, {
    new: true,
  });
  res
    .status(200)
    .json({ message: `Delete Contact name " ${contactToDelete.name}` });
});

module.exports = {
  getAllContact,
  postContact,
  putContact,
  getContact,
  deleteContact,
};
