const mongoose = require("mongoose"); 

const schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'name'"]
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'description'"]
  }
});

exports.POI = mongoose.model("poi", schema);