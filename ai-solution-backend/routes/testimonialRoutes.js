const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Public routes
router.get('/', testimonialController.getTestimonials);
router.post('/', testimonialController.createTestimonial);

module.exports = router;