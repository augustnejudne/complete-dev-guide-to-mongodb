const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation schema
const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email is required']
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
