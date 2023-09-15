const mongoose = require('mongoose');
const { Destination } = require('../model/destination.model.js');

// GET /destination
exports.list = async (req, res) => {
  try {
    const destinations_list = await Destination.find({}).exec();
    if (!destinations_list) {
      return res.status(500).json({
        success: false,
        message: 'Could not obtain destinations'
      });
    } 
    return res.status(200).json({
      success: true,
      message: 'Destinations obtained',
      destinations: destinations_list
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// GET /destination/:id
exports.listById = async (req, res) => {
  const query = { _id: req.params.id };
  try {
    const found_destination = await Destination.findOne(query).exec();
    if(!found_destination) {
      return res.status(500).json({
        success: false,
        message: 'Destination does not exist'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Destination obtained',
      destination: found_destination
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// GET /destination/poi/:id
exports.listDestinationPois = async (req, res) => {
  try {
    const found_destinations = await Destination.findOne({ _id: req.params.id }).exec();
    if(!found_destination) {
      return res.status(500).json({
        success: false,
        message: 'Destination was not found'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Destination Pois obtained',
      pois: res.body.itenerary
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// POST /destination
// Assumes that all the necessary destination data is in the payload
// {
//   name
//   currency
//   timezone
//   emergencyNumber
//   date
//   ticket
//   reservation
//   itenerary
//   {
//      poi
//   }
// }

exports.create = async (req, res) => {
  const create_data = req.body;
  try {
    // INSERT
    const new_destination = new Destination(create_data);
    await new_destination.save();

    return res.status(200).json({
      success: true,
      message: 'Destination created successfully',
      destination: new_destination
    });
  } catch (error) {
    console.log('Critical error: '+error);
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

// PATCH /destination/:id
exports.update = async(req, res) => {
  const update_data = req.body;
  const query = { _id: req.params.id };

  try {
    const updated_destination = await Destination.findOneAndUpdate(query, update_data, { new: true }).exec();
    if (!updated_destination) {
      return res.status(500).json({
        success: false,
        message: "Could not update destination"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      destination: updated_destination
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error
    });
  }
}

// DELETE /destination/:id
exports.delete = async (req, res) => {
  const query = { _id: req.params.id };

  try {
    const deleted_destination = await Destination.findOneAndDelete(query).exec();
    if(!deleted_destination) {
      return res.status(500).json({
        success: false,
        message: "Could not delete destination"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Destination deleted successfully",
      destination: deleted_destination
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}


exports.createFn = async (destination, pois_list) => {
    console.log('Creating destination...')
    const create_data = destination;
    create_data.itenerary = pois_list;
    const dest_res = new Destination(create_data);
    await dest_res.save();
    return dest_res;
}