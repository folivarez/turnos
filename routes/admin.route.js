const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const admin_controller = require('../controllers/admin.controller');


router.get('/', admin_controller.admin);



module.exports = router;