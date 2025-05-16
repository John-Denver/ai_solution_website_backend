const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};