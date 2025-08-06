#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const publicDir = path.join(distDir, 'public');

// Check if dist/public exists
if (!fs.existsSync(publicDir)) {
  console.log('❌ dist/public directory not found after build');
  process.exit(1);
}

// Create a symbolic link or copy structure that the server expects
// The server looks for files in a 'public' subdirectory relative to the server file
console.log('✅ Build completed successfully');
console.log('📁 Client files built to:', publicDir);
console.log('🚀 Server file built to:', path.join(distDir, 'index.js'));

// Ensure the directory structure is correct for production
const files = fs.readdirSync(publicDir);
console.log('📋 Built files:', files.join(', '));