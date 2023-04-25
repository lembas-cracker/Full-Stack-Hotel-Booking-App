const express = require("express");
const router = express.Router();
let User = require("../models/user.model");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verify-token");


//checking authentication and authorization
// router.get('/checkauth', verifyToken, (req, res, next) => {
//   res.send('Hello, you are logged in.')
// })  

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.send('Hello, you are logged in and you can delete your account.')
// })  

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('Hello admin, you are logged in and you can delete all accounts.')
// })  

//update a user
router.put("/:id", verifyUser, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

//delete a user
router.delete("/:id", verifyUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
});

//get a specific user
router.get("/:id", verifyUser, async (req, res) => {
  try {
    const user = await User.find(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//get all users
router.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
