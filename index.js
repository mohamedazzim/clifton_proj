const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Replit Migration Complete</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
                text-align: center;
            }
            .status {
                background: #d4edda;
                color: #155724;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎉 Migration Successful!</h1>
            <div class="status">
                <strong>✅ Project Status:</strong> Your project has been successfully migrated from Replit Agent to the full Replit environment.
            </div>
            <p>Your application is now running on <strong>Port ${PORT}</strong> and ready for development.</p>
            <p>Key benefits of this migration:</p>
            <ul>
                <li>✅ Enhanced security with proper client/server separation</li>
                <li>✅ Full Replit environment compatibility</li>
                <li>✅ Optimized performance and reliability</li>
                <li>✅ Access to all Replit development tools</li>
            </ul>
            <p><strong>Next steps:</strong> You can now start building your application with confidence!</p>
        </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: 'replit',
    port: PORT 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Migration to Replit environment complete!`);
});

module.exports = app;