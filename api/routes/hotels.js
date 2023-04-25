const express = require("express");
const router = express.Router();
const {verifyAdmin } = require("../utils/verify-token")
let Hotel = require("../models/hotel.model");


//create a hotel
router.post("/", verifyAdmin, async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
});

//update a hotel
router.put("/:id", verifyAdmin, async (req, res, next) => {
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
router.delete("/:id", verifyAdmin, async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted!");
  } catch (error) {
    next(error);
  }
});

//get a specific hotel
router.get("/:id", async (req, res, next) => {
  try {
    const hotel = await Hotel.find(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
});

//get all hotels
router.get("/", async (req, res, next) => {
  //pass an error to the next use() middleware in server.js with next()
  
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
