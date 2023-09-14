const express = require('express');
const router  = express.Router();
const controller = require('../controller/trip.controller.js');

router.use((req, res, next) => {
  const currDate = new Date();
  const timestamp = '['+currDate.getHours()+':'+currDate.getMinutes()+':'+currDate.getSeconds()+']';
  console.log(timestamp + ' ' + req.method + ' /trip' + req.path);
  next();
});

// GET /trip
router.get('/', controller.list);
// GET /trip/:id
router.get('/:id', controller.listById);
// POST /trip
router.post('/', controller.create);
// PATCH /trip/:id
router.patch('/:id', controller.update);
// DELETE /trip/:id
router.delete('/:id', controller.delete);

module.exports = router;
