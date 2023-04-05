const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  durations: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group Size"],
  },

  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"],
  },
  rating: {
    type: Number,
    required: [true, "A  tour must have a Rating"],
  },
  price: {
    type: Number,
    required: [true, "A  tour must have a Price"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
