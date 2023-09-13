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
    }
  }],
  status: {
    type: mongoose.Schema.Types.Boolean,
    required: [true, "Enter a valid value for 'status'"]
  },
  itenerary: [{
    poi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "poi",
      required: [true, "Enter a valid value for 'poi'"]
    },
    date: {
      type: mongoose.Schema.Types.Date,
      required: [true, "Enter a valid value for 'date'"]
    }
  }]
});

exports.Trip = mongoose.model("trip", schema);