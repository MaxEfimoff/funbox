//Location Schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: {
    type: String
  },
  position: {
    type: String
  }
});

module.exports = Location = mongoose.model("location", LocationSchema);
