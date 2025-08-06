import { build } from 'vite';
import { build as buildServer } from 'esbuild';
import { readFileSync } from 'fs';

console.log('Starting simple build process...');

try {
  // Build client
  console.log('Building client...');
  await build({
    configFile: './vite.config.simple.ts'
  });
  
  // Build server
  console.log('Building server...');
  await buildServer({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outdir: 'dist',
    packages: 'external',
    target: 'node18'
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}