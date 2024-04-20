var express = require('express');
var router = express.Router();
var admincontroller = require('../controller/admincontroller');

router.post('/add_admin',admincontroller.add_admin);
router.post('/login',admincontroller.login);
router.get('/logout',admincontroller.logout);

router.post('/add_user',admincontroller.add_user);
router.post('/update_user/:id',admincontroller.update_user);
router.get('/delete_user/:id',admincontroller.delete_user);
router.get('/view_user',admincontroller.view_user);

router.post('/add_task',admincontroller.add_task);
router.post('/update_task/:id',admincontroller.update_task);
router.get('/delete_task/:id',admincontroller.delete_task);
router.get('/view_task',admincontroller.view_task);

router.post('/check_status/:id',admincontroller.check_status);

module.exports = router;
