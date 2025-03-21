import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  // Log request
  console.log(`${req.method} ${req.url}`);

  // Parse URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Serve CSS file
  if (pathname === '/styles.css') {
    try {
      const cssContent = await fs.readFile(
        path.join(__dirname, 'public', 'styles.css'),
        'utf8'
      );
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(cssContent);
      return;
    } catch (error) {
      console.error('Error serving CSS:', error);
      res.writeHead(500);
      res.end('Internal Server Error');
      return;
    }
  }

  // Determine which HTML file to serve based on pathname
  let filePath;
  let statusCode = 200;

  switch (pathname) {
    case '/':
      filePath = path.join(__dirname, 'pages', 'index.html');
      break;
    case '/about':
      filePath = path.join(__dirname, 'pages', 'about.html');
      break;
    case '/contact':
      filePath = path.join(__dirname, 'pages', 'contact.html');
      break;
    default:
      filePath = path.join(__dirname, 'pages', '404.html');
      statusCode = 404;
      break;
  }

  // Read and serve the HTML file
  try {
    const content = await fs.readFile(filePath, 'utf8');
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(content);
  } catch (error) {
    console.error('Error serving page:', error);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
