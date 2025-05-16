const Inquiry = require('../models/Inquiry');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);
        await inquiry.save();
        res.status(201).json({ success: true, data: inquiry });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all inquiries (admin only)
// @route   GET /api/inquiries
// @access  Private
exports.getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ date: -1 });
        res.status(200).json({ success: true, data: inquiries });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};