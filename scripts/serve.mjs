// Production static server for the built SPA (dist/).
// No external dependency and no shell-specific env syntax, so it behaves
// identically on Railway's Linux container and on a developer's machine.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT) || 3000;
const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

async function resolveFile(urlPath) {
  const safePath = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(ROOT, safePath);

  try {
    const s = await stat(filePath);
    if (s.isDirectory()) filePath = join(filePath, 'index.html');
    await stat(filePath);
    return filePath;
  } catch {
    // Client-side routes (e.g. /explore, /location/:id) fall back to index.html.
    return join(ROOT, 'index.html');
  }
}

const server = createServer(async (req, res) => {
  try {
    const filePath = await resolveFile(req.url ?? '/');
    const data = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream',
    });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
    console.error(err);
  }
});

server.listen(PORT, () => {
  console.log(`Yer Analoglari ishlab chiqarish serveri: http://0.0.0.0:${PORT}`);
});
