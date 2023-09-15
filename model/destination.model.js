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
  currency: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'currency'"]
  },
  timeZone: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'timeZone'"]
  },
  emergencyNumber: {
    type: mongoose.Schema.Types.Number,
    required: [true, "Enter a valid value for 'emergencyNumber'"]
  },
  ticket: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'ticket'"]
  },
  reservation: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'reservation'"]
  },
  itinerary: [{
    poi:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "poi",
    required: [true, "Enter a valid value for 'poi'"] 
  }
 }]
});

exports.Destination = mongoose.model("destination", schema);