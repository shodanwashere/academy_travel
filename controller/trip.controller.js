const mongoose = require('mongoose');
const { Trip } = require('../model/trip.model.js');
const { DestinationController } = require('../controller/destination.controller.js');
const { PoiController } = require('../controller/poi.controller.js');

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

// GET /trip/:id/destinations
exports.listTripDestinations = async (req, res) => {
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
      message: 'Trip destinations obtained',
      destinations: res.body.destinations
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// GET /trip/attendee/:id
exports.listAttendeeTrips = async (req, res) => {
  try {
    const found_trips = await Trip.find({ attendees : { "$in" : [req.params.id] }}).exec();
    if(!found_trips) {
      return res.status(500).json({
        success: false,
        message: 'User is not attending any trips'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Attendee trips obtained',
      trips: found_trips
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
//   startDate
//   endDate
//   destinations
//   {
//      destination
//   }
//   status
// }

exports.create = async (req, res) => {
  try {
    const create_data = req.body;
    const destinations_list = create_data.destinations;
    console.log('Initiating Trip Creation!')
    console.log(create_data);
    // INSERT
    // checking each destination
    const destination_ids = new Array();
    for (var i = 0; i < destinations_list.length; i++) {
      console.log('\tCreating Destination with data:');
      console.log(destinations_list[i]);
      // checking each POI in this destination
      const poi_ids = new Array();
      const pois_list = destinations_list[i].itenerary;
      for (var j = 0; j < pois_list.length; j++){
        const poi_data = pois_list[j]
        const poi_res = PoiController.createFn(poi_data);
        console.log('POI Created: '+ poi_res._id);
        poi_ids.push({ poi: poi_res._id });
      }
      const dest_res = DestinationController.createFn(destinations_list[i], pois_list);
      destination_ids.push({ destination: dest_res._id });
    }
    create_data.destinations = destination_ids;
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