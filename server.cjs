// server.js
const jsonServer = require('json-server');
const path = require('path');

// Create the server
const app = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
app.use(jsonServer.defaults());

// Load data from db.json
const db = require(path.join(process.cwd(), 'db.json'));

// Create router
const router = jsonServer.router(db);

// Custom routes middleware
const rules = require(path.join(process.cwd(), 'routes.json'));
const rewriter = jsonServer.rewriter(rules);
app.use(rewriter);

// Custom middleware to format responses
app.use((req, res, next) => {
  // Store original send method
  const originalSend = res.send;

  res.send = function(body) {
    // Parse response body
    let data = body;
    if (typeof body === 'string') {
      try {
        data = JSON.parse(body);
      } catch (e) {
        return originalSend.call(this, body);
      }
    }

    // Handle users endpoint with pagination
    if ((req.path === '/users' || req.path.includes('/backoffice/api/v1/users')) && req.method === 'GET') {
      if (Array.isArray(data)) {
        // Extract query parameters
        const urlParams = new URLSearchParams(req.url.split('?')[1] || '');
        
        // Check if API-style pagination params are used (page/size)
        const apiPage = urlParams.get('page');
        const apiSize = urlParams.get('size');
        
        let page, perPage, totalItems, totalPages, paginatedData;
        
        if (apiPage !== null || apiSize !== null) {
          // API-style pagination (page is 0-indexed, size is number per page)
          page = parseInt(apiPage) || 0;
          perPage = parseInt(apiSize) || 10;
          
          totalItems = data.length;
          totalPages = Math.ceil(totalItems / perPage);
          
          // Apply pagination
          const startIndex = page * perPage;
          const endIndex = Math.min(startIndex + perPage, totalItems);
          paginatedData = data.slice(startIndex, endIndex);
        } else {
          // Fallback to json-server style pagination (_page is 1-indexed, _limit is number per page)
          const jsPage = parseInt(urlParams.get('_page') || '1') - 1; // Convert to 0-indexed
          const jsLimit = parseInt(urlParams.get('_limit') || '10');
          
          page = jsPage;
          perPage = jsLimit;
          
          totalItems = data.length;
          totalPages = Math.ceil(totalItems / perPage);
          
          // Apply pagination
          const startIndex = page * perPage;
          const endIndex = Math.min(startIndex + perPage, totalItems);
          paginatedData = data.slice(startIndex, endIndex);
        }

        // Return in API format
        const response = {
          code: "200",
          data: paginatedData,
          message: "Success",
          meta: {
            page: page,
            size: perPage,
            total_items: totalItems,
            total_pages: totalPages
          },
          time: new Date().toISOString()
        };

        return originalSend.call(this, JSON.stringify(response));
      }
    }

    // Handle single user endpoint
    if (req.path.includes('/users/') && req.method === 'GET' && typeof data === 'object' && data.id) {
      const response = {
        code: "200",
        data: data,
        message: "Success",
        time: new Date().toISOString()
      };
      
      return originalSend.call(this, JSON.stringify(response));
    }

    // Handle other endpoints that need wrapping
    if (req.path === '/health') {
      const response = {
        code: "200",
        data: data,
        message: "OK",
        time: new Date().toISOString()
      };
      
      return originalSend.call(this, JSON.stringify(response));
    }

    // For other requests, return as-is
    return originalSend.call(this, body);
  };

  next();
});

// Use the router
app.use(router);

// Start the server
const port = process.env.PORT || 4010;
app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});