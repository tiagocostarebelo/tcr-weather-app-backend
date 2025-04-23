import express from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Routes
import weatherRoute from '../routes/weatherRoute.js';
// import imageRoute from '../routes/imageRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// Dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files 
app.use(express.static(path.join(__dirname, '../../frontend')));

// Serve main HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// Use routes
app.use('/api/weather', weatherRoute);
// app.use('/api/image', imageRoute);

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
