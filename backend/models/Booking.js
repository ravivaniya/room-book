const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  room: String,
  date: String,
  startTime: String,
  endTime: String,
  user: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
