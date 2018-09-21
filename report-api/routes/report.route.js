const express = require('express');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const report_controller = require('../controllers/report.controller');

// A simple test url to check that all of our files are communicating correctly.
router.get('/', report_controller.report_details);
router.get('/:id', report_controller.report_details_by_id);
router.post('/create', report_controller.report_create);
module.exports = router;
