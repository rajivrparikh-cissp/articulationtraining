const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webm': 'audio/webm',
  '.m4a': 'audio/m4a'
};

const server = http.createServer((req, res) => {
  // 1. Proxy /api/ollama to local Ollama runtime (127.0.0.1:11434)
  if (req.url.startsWith('/api/ollama')) {
    const targetPath = req.url.replace(/^\/api\/ollama/, '') || '/';
    const proxyHeaders = { ...req.headers, host: '127.0.0.1:11434' };

    const proxyReq = http.request(
      {
        hostname: '127.0.0.1',
        port: 11434,
        path: targetPath,
        method: req.method,
        headers: proxyHeaders
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      }
    );

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Ollama local server unreachable on 127.0.0.1:11434', details: err.message }));
    });

    req.pipe(proxyReq, { end: true });
    return;
  }

  // 2. Serve static SPA files
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(DIST_DIR, urlPath);

  // Fallback to index.html for SPA client-side routing
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
    });
    res.end(content);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎙️ ExecutiveVoice Production Server listening on http://0.0.0.0:${PORT}`);
});
