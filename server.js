require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://keen-gingersnap-1f3fe5.netlify.app',
  credentials: true
}));


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Atlas connection error:', err));


// Routes
app.post('/api/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: 'Admin created' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ message: 'Login successful', admin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  // Verify token (you'll need to implement JWT verification)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Contact Inquiries
app.get('/api/admin/inquiries', authenticate, async (req, res) => {
  try {
    // Fetch from your database
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Blog Management
app.get('/api/admin/blogs', authenticate, async (req, res) => {
  // Get all blog posts
});

app.post('/api/admin/blogs', authenticate, async (req, res) => {
  // Create new blog post
});

app.put('/api/admin/blogs/:id', authenticate, async (req, res) => {
  // Update blog post
});

app.delete('/api/admin/blogs/:id', authenticate, async (req, res) => {
  // Delete blog post
});

// Events Management
app.get('/api/admin/events', authenticate, async (req, res) => {
  // Get all events
});

app.post('/api/admin/events', authenticate, async (req, res) => {
  // Create new event
});

// Services Management
app.get('/api/admin/services', authenticate, async (req, res) => {
  // Get all services
});

app.post('/api/admin/services', authenticate, async (req, res) => {
  // Create new service
});


// List all routes
// function printRoutes() {
//   console.log("Available routes:");
//   app._router.stack.forEach((middleware) => {
//     if (middleware.route) {
//       // Routes registered directly on the app
//       console.log(`${Object.keys(middleware.route.methods).join(', ')} ${middleware.route.path}`);
//     } else if (middleware.name === 'router') {
//       // Routes registered as router modules
//       middleware.handle.stack.forEach((handler) => {
//         const route = handler.route;
//         if (route) {
//           console.log(`${Object.keys(route.methods).join(', ')} ${route.path}`);
//         }
//       });
//     }
//   });
// }

// printRoutes();



// Start server
const PORT = process.env.PORT || 5000;

// Test Database Connection Route
app.get('/api/test-db', async (req, res) => {
  try {
    // Test a simple database operation
    const adminCount = await Admin.countDocuments();
    
    res.json({
      status: 'Database connection successful',
      adminCount: adminCount,
      database: mongoose.connection.name,
      host: mongoose.connection.host
    });
  } catch (err) {
    res.status(500).json({
      status: 'Database connection failed',
      error: err.message,
      connectionString: process.env.MONGODB_URI // This helps verify what's being used
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));