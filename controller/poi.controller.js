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

exports.create = async (req, res) => {
  const poi = new Poi(req.body);
  try {
    const saved_poi = await poi.save();
    return res.status(200).json({
      success: true,
      message: 'POI created',
      poi: saved_poi
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    });
  }
}

exports.createFn = async (poi) => {
  const created_poi = new Poi(poi);
  const saved_poi = await created_poi.save();
  return saved_poi;
}
