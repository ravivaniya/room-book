const Booking = require("../models/Booking");
const Rooms = require("../models/Rooms");

exports.createBooking = async (req, res) => {
  const { room, date, startTime, endTime, user } = req.body;

  // Check if the slot is available
  const existingBookings = await Booking.find({
    room,
    date,
    $or: [
      { startTime: { $lt: endTime, $gt: startTime } },
      { endTime: { $lt: endTime, $gt: startTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } },
    ],
  });

  if (existingBookings.length > 0) {
    return res.status(400).json({ message: "Time slot not available" });
  }

  const newBooking = new Booking({ room, date, startTime, endTime, user });
  await newBooking.save();
  res.status(201).json({ message: "Booking successful" });
};

exports.getBookings = async (req, res) => {
  const { room, date } = req.query;
  const bookings = await Booking.find({ room, date });
  res.status(200).json(bookings);
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find({});
    res.status(200).json(rooms);
  } catch (err) {
    console.log(err);
  }
};
