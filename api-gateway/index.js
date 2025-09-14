//@ts-nocheck
require('dotenv').config();
const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const helmet = require("helmet");


const app = express();
const port = process.env.PORT || 3000;


// Proxy configuration for AUth Service
app.use(
  '/auth', // Path to match for user service requests
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true, // Needed for virtual hosted sites
    pathRewrite: {
      '^/auth': '', // Remove '/users' from the path before forwarding
    },
  })
);

// Proxy configuration for Order Service
app.use(
  '/orders', // Path to match for order service requests
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/orders': '',
    },
  })
);

// Proxy configuration for product Service
app.use(
  '/products', // Path to match for product service requests
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/orders': '',
    },
  })
);

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use(helmet());

// Start the server

app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
