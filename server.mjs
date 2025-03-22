import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Log all requests
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route Handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contact.html'));
});

// 404 handler must be last
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
});

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
