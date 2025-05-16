const Testimonial = require('../models/Testimonial');

// @desc    Get all approved testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find({ approved: true }).sort({ date: -1 });
        res.status(200).json({ success: true, data: testimonials });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Public
exports.createTestimonial = async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        await testimonial.save();
        res.status(201).json({ success: true, data: testimonial });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};