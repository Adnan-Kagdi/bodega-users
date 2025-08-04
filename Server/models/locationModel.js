const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  updatedAt: { type: Date, default: Date.now },
});

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
