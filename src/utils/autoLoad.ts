import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

export async function autoLoadRoutes(routesDir: string): Promise<number> {
  const files = await getFiles(routesDir);

  for (const file of files) {
    await import(`file://${file}`);
  }

  return files.length;
}

async function getFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      files.push(...await getFiles(fullPath));
    } else if (extname(entry) === '.js' || extname(entry) === '.ts') {
      files.push(fullPath);
    }
  }

  return files;
}
