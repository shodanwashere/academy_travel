const mongoose = require("mongoose"); 

const schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'name'"]
  },
  startDate: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'startDate'"]
  },
  endDate: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'endDate'"]
  },
  destinations: [{
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "destination",
      required: [true, "Enter a valid value for 'destination'"]
    }
  }],
  status: {
    type: mongoose.Schema.Types.Boolean,
    required: [true, "Enter a valid value for 'status'"]
  },
});

exports.trip = mongoose.model("trip", schema);