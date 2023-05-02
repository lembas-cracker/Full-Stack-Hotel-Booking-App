const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");

require("dotenv").config();

const port = process.env.PORT || 8800;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection is established!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json()); //middleware for being able to send json objects to express server

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

//error handling middleware
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Error From Handler Occured!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });  
});

app.listen(port, () => {
  connect();
  console.log(`Server is running on ${port}`);
});
