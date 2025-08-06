#!/bin/bash

# Build script for Render deployment
echo "Starting CLIFTON build process..."

# Build client with Vite
echo "Building client..."
npx vite build

# Build server with esbuild
echo "Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completed successfully!"
echo "Client files in: dist/public/"
echo "Server file: dist/index.js"