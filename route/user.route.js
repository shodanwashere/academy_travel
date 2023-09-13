const express = require('express');
const router  = express.Router();
const controller = require('../controller/user.controller.js');

router.use((req, res, next) => {
  const currDate = new Date();
  const timestamp = '['+currDate.getHours()+':'+currDate.getMinutes()+':'+currDate.getSeconds()+']';
  console.log(timestamp + ' ' + req.method + ' ' + req.path);
  next();
});

// GET /user
router.get('/', controller.list);
// GET /user/:id
router.get('/:id', controller.listById);
// POST /user
router.post('/', controller.create);
// PATCH /user/:id
router.patch('/:id', controller.update);
// DELETE /user/:id
router.delete('/:id', controller.delete);
