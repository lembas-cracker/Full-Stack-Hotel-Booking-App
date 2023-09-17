const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");
let User = require("../models/user.model");

router.post("/register", async (req, res, next) => {
  try {
    //encrypting passwords
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(403, "Wrong password or username!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(403, "Wrong password or username!"));

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

    //destructuring those properties we don't want to send back in response like password and isAdmin properties
    const { password, isAdmin, ...other } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true, sameSite: "none", secure: true })
      .status(200)
      .json({ details: { ...other }, isAdmin });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
