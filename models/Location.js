const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  riderId: {
    type: String,
    required: true,
    unique: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
