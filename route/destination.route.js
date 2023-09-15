const express = require('express');
const router  = express.Router();
const controller = require('../controller/destination.controller.js');

router.use((req, res, next) => {
  const currDate = new Date();
  const timestamp = '['+currDate.getHours()+':'+currDate.getMinutes()+':'+currDate.getSeconds()+']';
  console.log(timestamp + ' ' + req.method + ' /destination' + req.path);
  next();
});

// GET /destination
router.get('/', controller.list);
// GET /destination/:id
router.get('/:id', controller.listById);
// POST /destination
router.post('/', controller.create);
// PATCH /destination/:id
router.patch('/:id', controller.update);
// DELETE /destination/:id
router.delete('/:id', controller.delete);

module.exports = router;
