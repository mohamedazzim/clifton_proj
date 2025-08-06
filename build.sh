#!/bin/bash

# Build script for Render deployment - Reliable version
echo "Starting CLIFTON build process..."

# Ensure we're in the right directory
cd /opt/render/project/src 2>/dev/null || cd .

# Clear any existing dist folder
rm -rf dist

# Build client with explicit node_modules path
echo "Building client with Vite..."
./node_modules/.bin/vite build --mode production

# Verify client build
if [ ! -d "dist/public" ]; then
    echo "Error: Client build failed - dist/public not found"
    exit 1
fi

# Build server with explicit node_modules path
echo "Building server with esbuild..."
./node_modules/.bin/esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --target=node18

# Verify server build
if [ ! -f "dist/index.js" ]; then
    echo "Error: Server build failed - dist/index.js not found"
    exit 1
fi

echo "Build completed successfully!"
echo "Client files: $(ls -la dist/public/ | wc -l) files in dist/public/"
echo "Server file: $(ls -la dist/index.js)"
echo "Total dist size: $(du -sh dist/)"