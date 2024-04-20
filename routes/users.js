var express = require('express');
var router = express.Router();
var usercontroller = require('../controller/usercontroller');

router.post('/login',usercontroller.login);
router.get('/logout',usercontroller.logout);
router.post('/update_task',usercontroller.update_task);
router.get('/view_task',usercontroller.view_task);

module.exports = router;
