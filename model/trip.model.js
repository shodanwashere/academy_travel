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
  itinerary: [{
    name: {
      type: mongoose.Schema.Types.String,
      required: [true, "Enter a valid value for 'name'"]
    },
    description: {
      type: mongoose.Schema.Types.String,
      required: [true, "Enter a valid value for 'description'"]
    },
    date: {
      type: mongoose.Schema.Types.Date,
      required: [true, "Enter a valid value for 'date'"]
    }
  }],
  status: {
    type: mongoose.Schema.Types.Boolean,
    required: [true, "Enter a valid value for 'status'"]
  },
});

exports.Trip = mongoose.model("trip", schema);