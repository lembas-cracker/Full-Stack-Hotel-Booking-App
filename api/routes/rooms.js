const express = require('express')
const router = express.Router()
let Room = require("../models/room.model");
let Hotel = require("../models/hotel.model");
const {createError} = require("../utils/error");
const { verifyAdmin } = require('../utils/verify-token');


//create a room
router.post('/:hotelid', verifyAdmin, async (req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        await Hotel.findByIdAndUpdate(hotelId, {
            $push : {rooms: savedRoom._id}
        });
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
})

//update a room
router.put("/:id", verifyAdmin, async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (error) {
      next(error);
    }
  });
  
  //delete a room
  router.delete("/:id/:hotelid", verifyAdmin, async (req, res, next) => {
    const hotelId = req.params.hotelid

    try {
      await Room.findByIdAndDelete(req.params.id);
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: {rooms: req.params.id}
      })
      res.status(200).json("Room has been deleted!");
    } catch (error) {
      next(error);
    }
  });
 
  //fix urls
  // /rooms/123/456
  // /hotels/456/rooms/123
  // /movies/123/soundtrack
  
  //get a specific room
  router.get("/:id", async (req, res, next) => {
    try {
      const room = await Room.find(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  });
  
  //get all rooms
  router.get("/", async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  });

module.exports = router