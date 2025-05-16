const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const auth = require('../middleware/auth');

// Public routes
router.post('/', inquiryController.createInquiry);

// Protected routes
router.get('/', auth, inquiryController.getInquiries);

module.exports = router;

module.exports = router;