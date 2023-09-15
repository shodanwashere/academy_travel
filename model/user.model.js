const mongoose = require("mongoose"); 

const schema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'username'"]
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'name'"]
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'password'"],
    select: false
  },
  isAdmin: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  trips: [{
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trip",
      required: [true, "Enter a valid value for 'trip'"]
    }
  }],
  identificationDoc: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'identificationDoc'"]
  },
  vaccination: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'vaccination'"]
  },
});

exports.User = mongoose.model("user", schema);
