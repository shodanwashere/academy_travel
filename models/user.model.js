const mongoose = require("mongoose"); 

const schema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'username'"]
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'password'"]
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'name'"]
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'password'"]
  },
  isAdmin: {
    type: mongoose.Schema.Types.Boolean,
    required: [true, "Enter a valid value for 'isAdmin'"]
  },
});

exports.User = mongoose.model("user", schema);