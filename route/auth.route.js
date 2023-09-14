const express = require('express');
const router  = express.Router();
const controller = require('../controller/auth.controller.js');

router.use((req, res, next) => {
  const currDate = new Date();
  const timestamp = '['+currDate.getHours()+':'+currDate.getMinutes()+':'+currDate.getSeconds()+']';
  console.log(timestamp + ' ' + req.method + ' /auth' + req.path);
  next();
});


router.get('/login', controller.login);
router.post('/register', controller.register);


module.exports = router;