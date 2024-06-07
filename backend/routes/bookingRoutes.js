const express = require("express");
const {
  createBooking,
  getBookings,
  getRooms,
} = require("../controllers/bookingController");
const router = express.Router();

router.post("/book", createBooking);
router.get("/bookings", getBookings);
router.get("/rooms", getRooms);

module.exports = router;
