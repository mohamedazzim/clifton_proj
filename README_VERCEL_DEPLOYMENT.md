# Deploying CLIFTON Website to Vercel

I've prepared your project for Vercel deployment. Here's how to deploy it:

## Prerequisites
1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`

## Deployment Steps

### Option 1: Using Vercel CLI (Recommended)
1. Download all project files to your local machine
2. Open terminal in the project directory
3. Run: `vercel`
4. Follow the prompts:
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `dist`

### Option 2: Using Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import from Git (upload your code to GitHub first)
4. Configure:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`

## Important Configuration

### Environment Variables (Required)
Add these in Vercel dashboard under Settings > Environment Variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: production

### Files Added for Vercel
- `vercel.json`: Vercel configuration for routing API and static files
- This README with deployment instructions

## Database Setup
Your app uses PostgreSQL. You have two options:

1. **Neon Database** (Recommended - already configured)
   - Your current database should work
   - Make sure to add the DATABASE_URL in Vercel environment variables

2. **Vercel Postgres**
   - Create a Vercel Postgres database
   - Update DATABASE_URL in environment variables

## Post-Deployment
After deployment:
1. Test all API endpoints work
2. Verify the contact form submissions
3. Check product pages load correctly
4. Ensure Portuguese translations work

Your CLIFTON website will be available at: `https://your-project-name.vercel.app`

## Need Help?
If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set
3. Ensure database connection is working