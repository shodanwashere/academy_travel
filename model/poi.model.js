const mongoose = require("mongoose"); 

const schema = new mongoose.Schema({
  country_code: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'country_code'"]
  },
  city: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'city'"]
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'name'"]
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: [true, "Enter a valid value for 'description'"]
  }
});

exports.Poi = mongoose.model("pois", schema);