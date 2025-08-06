# Render Deployment Guide for Clifton Traders

## Quick Setup for Render

### 1. Repository Setup
- Ensure your code is pushed to a GitHub repository
- Make sure the `render.yaml` file is in the root directory

### 2. Render Configuration
Create a new Web Service on Render with these settings:

**Build Command:**
```bash
npm install && vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --external:bufferutil --external:utf-8-validate
```

**Start Command:**
```bash
NODE_ENV=production node dist/index.js
```

### 3. Environment Variables
Set these in your Render dashboard:

- `NODE_ENV`: `production`
- `DATABASE_URL`: (if using external database)

### 4. Root Directory
- Set Root Directory to: `.` (current directory)

### 5. Auto-Deploy
- Enable auto-deploy from your main branch

## Fixed Issues for Render

1. **Port Configuration**: Updated to use `process.env.PORT` for Render
2. **Missing API Endpoint**: Added `/api/contact` route for contact form
3. **CORS Configuration**: Added proper CORS headers for API access
4. **Build Configuration**: Optimized esbuild settings for production

## API Endpoints Available

- `GET /api/founders` - Get company founders
- `GET /api/products` - Get product catalog  
- `GET /api/projects` - Get company projects
- `POST /api/contact` - Submit contact form
- `POST /api/contacts` - Create contact record
- `GET /api/contacts` - Get all contacts

## Common Issues & Solutions

### Issue: "Failed to load services"
**Solution**: Ensure all API endpoints are properly configured and the server is running on the correct port.

### Issue: CORS errors
**Solution**: CORS has been configured to allow all origins in production. For specific domains, update the server configuration.

### Issue: Build failures
**Solution**: Make sure all dependencies are listed in package.json and the build command includes all necessary steps.

## Database Considerations

Currently using in-memory storage which resets on each deployment. For production:

1. Consider migrating to PostgreSQL/Neon Database
2. Use environment variables for database connection
3. Implement proper database migrations

## Performance Optimizations

- Static assets are served efficiently
- Bundle splitting for optimal loading
- Compressed assets for faster delivery

## Support

If deployment issues persist:
1. Check Render logs for specific error messages
2. Verify all environment variables are set
3. Ensure the GitHub repository is properly connected