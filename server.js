require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('AI-Solution Backend API');
});

// Routes
const inquiryRoutes = require('./ai-solution-backend/routes/inquiryRoutes');
const testimonialRoutes = require('./ai-solution-backend/routes/testimonialRoutes');

app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);


// In server.js (temporary - remove after creating first admin)
const Admin = require('./ai-solution-backend/models/admin');
const bcrypt = require('bcryptjs');

app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const admin = new Admin({ username, password });
        await admin.save();
        res.status(201).json({ success: true, data: admin });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// Set port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});