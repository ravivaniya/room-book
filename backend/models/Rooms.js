const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  availability: Boolean,
  seatingCapcity: Number,
});

const Rooms = mongoose.model("Rooms", roomsSchema);

module.exports = Rooms;
