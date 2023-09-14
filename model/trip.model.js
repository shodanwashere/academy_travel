const mongoose = require("mongoose"); 

const schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'name'"]
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'description'"]
  },
  currency: {
    type: mongoose.Schema.Types.Decimal128,
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
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Enter a valid value for 'creator'"]
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Enter a valid value for 'user'"]
    },
    ticket: {
      type: mongoose.Schema.Types.String,
      ref: "user",
      required: [true, "Enter a valid value for 'ticket'"]
    },
    reservation: {
      type: mongoose.Schema.Types.String,
      ref: "user",
      required: [true, "Enter a valid value for 'reservation'"]
    },
  }],
  status: {
    type: mongoose.Schema.Types.Boolean,
    required: [true, "Enter a valid value for 'status'"]
  },
  itenerary: [{
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
  }]
});

exports.Trip = mongoose.model("trip", schema);