const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../utils/verify-token");
let Hotel = require("../models/hotel.model");
let Room = require("../models/room.model");

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
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
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
router.get("/find/:id", async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
});

//get all hotels
router.get("/", async (req, res, next) => {
  //pass an error to the next use() middleware in server.js with next()

  try {
    const { limit, min, max, ...params } = req.query;
    const hotels = await Hotel.find({ ...params, cheapestPrice: { $gt: min || 1, $lt: max || 999 } }).limit(limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
});

router.get("/countByCity", async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});

router.get("/countByType", async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
});

router.get("/room/:id", async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
