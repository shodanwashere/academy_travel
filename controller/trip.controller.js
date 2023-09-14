const mongoose = require('mongoose');
const { Trip } = require('../model/trip.model.js');

// GET /trip
exports.list = async (req, res) => {
  try {
    const trips_list = await Trip.find({}).exec();
    if (!trips_list) {
      return res.status(500).json({
        success: false,
        message: 'Could not obtain trips'
      });
    } 
    return res.status(200).json({
      success: true,
      message: 'Trips obtained',
      trips: trips_list
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// GET /trip/:id
exports.listById = async (req, res) => {
  const query = { _id: req.params.id };
  try {
    const found_trip = await Trip.findOne(query).exec();
    if(!found_trip) {
      return res.status(500).json({
        success: false,
        message: 'Trip does not exist'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Trip obtained',
      trip: found_trip
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// POST /trip
// Assumes that all the necessary trip data is in the payload
// {
//   name
//   description
//   creator
//   atendees
//   status
//   itenerary
//   {
//      poi
//      date
//   }
// }

exports.create = async (req, res) => {
  const create_data = req.body;
  try {
    // INSERT
    const new_trip = new Trip(create_data);
    await new_trip.save();

    return res.status(200).json({
      success: true,
      message: 'Trip created successfully',
      trip: new_trip
    });
  } catch (error) {
    console.log('Critical error: '+error);
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// PATCH /trip/:id
exports.update = async(req, res) => {
  const update_data = req.body;
  const query = { _id: req.params.id };

  try {
    const updated_trip = await Trip.findOneAndUpdate(query, update_data, { new: true }).exec();
    if (!updated_trip) {
      return res.status(500).json({
        success: false,
        message: "Could not update trip"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      trip: updated_trip
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error
    });
  }
}

// DELETE /trip/:id
exports.delete = async (req, res) => {
  const query = { _id: req.params.id };

  try {
    const deleted_trip = await Trip.findOneAndDelete(query).exec();
    if(!deleted_user) {
      return res.status(500).json({
        success: false,
        message: "Could not delete trip"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
      trip: deleted_trip
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}

function getDetails(json) {
  const locationId = json.location_id;
  
  // Get the description of the place
  const detailsUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?language=pt&currency=EUR&key=CEEE2CE7F78542A0A6079F8AC8969F1E`;

  const options = {method: 'GET', headers: {accept: 'application/json'}};

  // Return the fetch promise
  return fetch(detailsUrl, options)
  .then(response => {
    return response.json();
  })
  .catch(err => {
    throw err; // Rethrow the error to propagate it up the promise chain
  });
}

exports.getSuggestions = async (req, res) => {
  const url = "https://api.content.tripadvisor.com/api/v1/location/search?key=CEEE2CE7F78542A0A6079F8AC8969F1E&searchQuery=" + req.params.locationname + "&category=attractions&radius=10&radiusUnit=km&language=pt";

  const options = {method: 'GET', headers: {accept: 'application/json'}};

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    // Remove the first entry of the json, which is the city
    json.data.shift();

    detailsData = [];
    const detailsPromises = json.data.map(getDetails);

    // Wait for all the detailsPromises to resolve
    detailsData = await Promise.all(detailsPromises);

    // Add the details data to the json object
    json.data.forEach((item, index) => {
      if (!item.hasOwnProperty('error')) {
        item.details = detailsData[index];
      }
    });

    res.status(200).json({
      success: true,
      message: 'Suggestions obtained',
      suggestions: json.data
    });
  } catch (err) {
    console.error("Initial Error:", err);
    res.status(500).json({
      success: false,
      message: 'Error obtaining suggestions',
    });
  }
}
