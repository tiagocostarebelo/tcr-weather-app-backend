import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Routes
import callsRoute from '../routes/callsRoute.js';

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
// app.use(express.static(path.join(__dirname, '../../frontend')));

// Serve main HTML
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/index.html'));
// });

// Use routes
app.use('/api/weather', callsRoute);

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
