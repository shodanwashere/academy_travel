const { Poi } = require('../model/poi.model.js');

exports.list = async (req, res) => {
  try {
    const poi_list = await Poi.find({}).exec();

    if (!poi_list) {
      return res.status(500).json({
        success: false,
        message: 'Could not obtain POIs'
      });
    } 
    return res.status(200).json({
      success: true,
      message: 'POIs obtained',
      pois: poi_list
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

exports.listById = async (req, res) => {
  const query = { _id: req.params.id };
  try {
    const found_poi = await Poi.findOne(query).exec();
    if(!found_poi) {
      return res.status(500).json({
        success: false,
        message: 'POI does not exist'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'POI obtained',
      poi: found_poi
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

exports.listByCountry = async (req, res) => {
  try {
    const poi_list = await Poi.find({ country_code: req.params.country_code }).exec();
    
    if (!poi_list) {
      return res.status(500).json({
        success: false,
        message: 'Could not obtain POIs'
      });
    } 
    return res.status(200).json({
      success: true,
      message: 'POIs obtained',
      pois: poi_list
    });
  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

exports.listByCity = async (req, res) => {
  try {
    const poi_list = await Poi.find({ city: req.params.city }).exec();
    
    if (!poi_list) {
      return res.status(500).json({
        success: false,
        message: 'Could not obtain POIs'
      });
    } 
    return res.status(200).json({
      success: true,
      message: 'POIs obtained',
      pois: poi_list
    });
  }

  catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}
