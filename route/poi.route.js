const express = require('express');
const router  = express.Router();
const controller = require('../controller/poi.controller.js');

router.use((req, res, next) => {
  const currDate = new Date();
  const timestamp = '['+currDate.getHours()+':'+currDate.getMinutes()+':'+currDate.getSeconds()+']';
  console.log(timestamp + ' ' + req.method + ' /poi' + req.path);
  next();
});

// GET /poi
router.get('/', controller.list);
// GET /poi/:id
router.get('/id/:id', controller.listById);
// GET /poi/counttry/:country
router.get('/country/:country_code', controller.listByCountry);
// GET /poi/city/:city
router.get('/city/:city', controller.listByCity);

// GET SUGGESTIONS
router.get('/tripadvisor/locations/:locationname', controller.getSuggestions);
// POST /poi
// router.post('/', controller.create);
// // PATCH /poi/:id
// router.patch('/:id', controller.update);
// // DELETE /poi/:id
// router.delete('/:id', controller.delete);

module.exports = router;