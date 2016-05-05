import fs from 'fs';
import path from 'path';

export default function prune(dir) {
  if (!fs.statSync(dir).isDirectory()) {
    return;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullpath = path.join(dir, file);
    prune(fullpath);
  });

  files.length === 0 && fs.rmdirSync(dir);
}
