#!/bin/bash

# Build script for Render deployment - Reliable version
echo "Starting CLIFTON build process..."

# Ensure we're in the right directory
cd /opt/render/project/src 2>/dev/null || cd .

# Clear any existing dist folder
rm -rf dist

# Build client - try multiple approaches
echo "Building client with Vite..."
if [ -f "./node_modules/.bin/vite" ]; then
    ./node_modules/.bin/vite build --mode production
elif command -v npx >/dev/null 2>&1; then
    npx vite build --mode production
else
    # Last resort: direct node execution
    node ./node_modules/vite/bin/vite.js build --mode production
fi

# Verify client build
if [ ! -d "dist/public" ]; then
    echo "Error: Client build failed - dist/public not found"
    exit 1
fi

# Build server - try multiple approaches  
echo "Building server with esbuild..."
if [ -f "./node_modules/.bin/esbuild" ]; then
    ./node_modules/.bin/esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --target=node18
elif command -v npx >/dev/null 2>&1; then
    npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --target=node18
else
    # Last resort: direct node execution
    node ./node_modules/esbuild/bin/esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --target=node18
fi

# Verify server build
if [ ! -f "dist/index.js" ]; then
    echo "Error: Server build failed - dist/index.js not found"
    exit 1
fi

echo "Build completed successfully!"
echo "Client files: $(ls -la dist/public/ | wc -l) files in dist/public/"
echo "Server file: $(ls -la dist/index.js)"
echo "Total dist size: $(du -sh dist/)"