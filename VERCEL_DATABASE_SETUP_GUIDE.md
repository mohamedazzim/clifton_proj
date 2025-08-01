# Vercel Database Setup - Complete Guide

## What is DATABASE_URL and Why You Need It

Your CLIFTON website uses a PostgreSQL database to store:
- Company founders information (Benson Clement, Joseph Ebenezer)
- Product catalog data (agriculture, textile products)
- Contact form submissions from website visitors
- Project portfolio data

The `DATABASE_URL` is a connection string that tells your app how to connect to this database.

## Current Database Setup (Replit)

Right now, your app is configured to use Replit's internal database. But when you deploy to Vercel, you need a database that Vercel can access.

## Option 1: Use Neon Database (Recommended - Free Tier Available)

### Step 1: Create Neon Account
1. Go to https://neon.tech
2. Sign up for free account
3. Create a new project
4. Choose PostgreSQL version (latest recommended)

### Step 2: Get Your Connection String
1. In Neon dashboard, go to "Connection Details"
2. Copy the connection string that looks like:
   ```
   postgresql://username:password@hostname:5432/database_name?sslmode=require
   ```

### Step 3: Set Up Your Database Schema
1. In Neon console, run this SQL to create tables:

```sql
-- Create founders table
CREATE TABLE IF NOT EXISTS founders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  bio TEXT,
  "imageUrl" VARCHAR(500),
  email VARCHAR(255),
  linkedin VARCHAR(500),
  twitter VARCHAR(500),
  instagram VARCHAR(500),
  facebook VARCHAR(500),
  "order" INTEGER
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255),
  "imageUrl" VARCHAR(500),
  price DECIMAL(10,2),
  "tradingVolume" VARCHAR(255),
  "minimumOrder" VARCHAR(255),
  specifications JSONB,
  origins TEXT[],
  certifications TEXT[],
  features TEXT[]
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  message TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample founders data
INSERT INTO founders (name, position, bio, "imageUrl", email, linkedin, twitter, instagram, facebook, "order") VALUES
('Benson Clement', 'CEO', 'BA English Literature, MBA HR and Marketing. With 12 years of experience in textiles, trading, import and export, Benson leads strategic operations and business development.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400', 'benson@cliftontraders.com', 'https://linkedin.com/in/benson-clement-clifton', 'https://twitter.com/bensonclement_md', 'https://instagram.com/bensonclement_director', 'https://facebook.com/benson.clement.clifton', 1),
('Joseph Ebenezer', 'COO', 'B.Sc (Physics), MBA (HR & Marketing). With 10 years of experience in TRADING, IMPORT and EXPORT, sales & marketing in IT & Non-IT sector services, drives technical strategy and market expansion.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400', 'joseph@cliftontraders.com', 'https://linkedin.com/in/joseph-ebenezer-clifton', 'https://twitter.com/josephebenezer_td', 'https://instagram.com/josephebenezer_tech', 'https://facebook.com/joseph.ebenezer.clifton', 2);
```

## Option 2: Use Vercel Postgres (Paid)

### Step 1: In Vercel Dashboard
1. Go to your project settings
2. Click "Storage" tab
3. Click "Create Database"
4. Choose "Postgres"
5. Select region and plan

### Step 2: Get Connection Details
Vercel will automatically provide environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` 
- `POSTGRES_URL_NON_POOLING`

Use `POSTGRES_URL` as your `DATABASE_URL`.

## Setting Environment Variables in Vercel

### Step 1: Access Project Settings
1. Go to https://vercel.com/dashboard
2. Click on your deployed project
3. Go to "Settings" tab
4. Click "Environment Variables" in left sidebar

### Step 2: Add DATABASE_URL
1. Click "Add New" button
2. **Name:** `DATABASE_URL`
3. **Value:** Your connection string from Neon or Vercel Postgres
4. **Environment:** Choose "Production" (and "Preview" if you want)
5. Click "Save"

### Example DATABASE_URL Values:

**Neon Database:**
```
postgresql://clifton_user:your_password@ep-cool-cloud-123456.us-east-1.aws.neon.tech/cliftondb?sslmode=require
```

**Vercel Postgres:**
```
postgres://default:your_password@ep-red-tree-123456-pooler.us-east-1.postgres.vercel-storage.com/verceldb?sslmode=require
```

## Step 3: Redeploy Your App

After adding the environment variable:
1. Go to "Deployments" tab in Vercel
2. Click "Redeploy" on your latest deployment
3. Or make a small change to trigger automatic deployment

## Testing Your Database Connection

After deployment, test these endpoints:
- `https://your-app.vercel.app/api/founders` - Should return founder data
- `https://your-app.vercel.app/api/products` - Should return products
- Contact form should work and save to database

## Common Issues and Solutions

### Issue: "DATABASE_URL not found"
**Solution:** Make sure environment variable is spelled exactly `DATABASE_URL` (all caps)

### Issue: "Connection timeout"
**Solution:** Check if your database allows connections from Vercel's IP ranges

### Issue: "SSL required"
**Solution:** Add `?sslmode=require` to end of connection string

### Issue: "Table doesn't exist"
**Solution:** Run the SQL schema creation commands in your database console

## Security Notes

1. **Never commit DATABASE_URL to code** - Always use environment variables
2. **Use SSL connections** - Add `?sslmode=require` to connection string
3. **Limit database user permissions** - Create dedicated user for your app
4. **Enable connection pooling** - For better performance

## Need Help?

If you encounter issues:
1. Check Vercel function logs for specific error messages
2. Test database connection using a database client
3. Verify all SQL tables are created properly
4. Ensure environment variable is set correctly in Vercel dashboard

Your database setup is complete when you can access `/api/founders` and see your company data!