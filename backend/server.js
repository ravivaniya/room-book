const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(cors());
app.use(express.json());
app.use("/api", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
