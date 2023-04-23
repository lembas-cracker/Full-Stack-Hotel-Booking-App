const express = require("express");
const router = express.Router();
let Hotel = require("../models/hotel.model");
const { createError } = require("../utils/error");

//create a hotel
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
});

//update a hotel
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
});

//delete a hotel
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted!");
  } catch (error) {
    next(error);
  }
});

//get a specific hotel
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.find(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
});

//get all hotels
router.get("/", async (req, res, next) => {
  const failed = true;

  //pass an error to the next use() middleware in server.js
  if (failed) return next(createError(401, "You are not authenticated"));

  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
