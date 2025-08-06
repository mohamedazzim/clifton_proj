#!/usr/bin/env node

// Production server test script
import https from 'https';
import http from 'http';

const RENDER_URL = 'https://clifton-proj.onrender.com';
const endpoints = [
  '/api/health',
  '/api/founders', 
  '/api/products',
  '/api/projects',
  '/api/debug/routes'
];

async function testEndpoint(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          data: data.length > 500 ? data.substring(0, 500) + '...' : data
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url,
        status: 'ERROR',
        error: error.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        error: 'Request timeout'
      });
    });
  });
}

async function runTests() {
  console.log('🔍 Testing CLIFTON Production Deployment on Render\n');
  console.log(`Target URL: ${RENDER_URL}\n`);
  
  for (const endpoint of endpoints) {
    const fullUrl = RENDER_URL + endpoint;
    console.log(`Testing: ${endpoint}`);
    
    const result = await testEndpoint(fullUrl);
    
    if (result.status === 200) {
      console.log(`✅ SUCCESS (${result.status})`);
      if (endpoint === '/api/debug/routes') {
        try {
          const routes = JSON.parse(result.data);
          console.log(`   Routes found: ${routes.totalRoutes}`);
        } catch (e) {
          console.log(`   Response: ${result.data.substring(0, 100)}...`);
        }
      }
    } else if (result.status === 404) {
      console.log(`❌ NOT FOUND (404)`);
    } else {
      console.log(`⚠️  ${result.status} - ${result.error || result.data.substring(0, 100)}`);
    }
    console.log();
  }
  
  console.log('\n🎯 Diagnosis:');
  console.log('If all endpoints return 404, the issue is:');
  console.log('1. Server not starting properly on Render');
  console.log('2. Routes not being registered in production');
  console.log('3. Build configuration issue on Render');
  console.log('\nCheck Render logs for startup errors!');
}

runTests().catch(console.error);