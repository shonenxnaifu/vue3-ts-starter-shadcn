// api-server.cjs
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

// Custom middleware to format responses according to API specification
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
    if ((req.path === '/users' || req.path === '/backoffice/api/v1/users') && req.method === 'GET') {
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
    if ((req.path.startsWith('/users/') || req.path.includes('/backoffice/api/v1/users/')) && 
        req.method === 'GET' && 
        typeof data === 'object' && data.id) {
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

// Define routes manually instead of using route mapping
app.get('/backoffice/api/v1/users', (req, res) => {
  // Get all users from the database
  const allUsers = db.users;
  
  // Apply any filters from query parameters
  let filteredUsers = allUsers;
  
  // Apply type filter if specified
  if (req.query.type) {
    filteredUsers = filteredUsers.filter(user => user.type === req.query.type);
  }
  
  // Apply search filter if specified
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    filteredUsers = filteredUsers.filter(user => 
      user.full_name.toLowerCase().includes(searchTerm) || 
      user.email.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply the middleware logic to handle pagination
  // Since we're intercepting the request, we need to call the next middleware manually
  // by calling the original response handling
  res.locals.data = filteredUsers;
  next();
});

app.get('/backoffice/api/v1/users/:id', (req, res) => {
  const user = db.users.find(u => u.id === req.params.id);
  if (user) {
    res.locals.data = user;
    next();
  } else {
    res.status(404).json({ code: "404", message: "User not found", time: new Date().toISOString() });
  }
});

app.get('/backoffice/api/v1/users/mitra-list', (req, res) => {
  res.locals.data = db.mitra_list;
  next();
});

app.get('/backoffice/api/v1/users/roles', (req, res) => {
  res.locals.data = db.roles;
  next();
});

app.get('/health', (req, res) => {
  res.locals.data = db.health;
  next();
});

// Use the router for other endpoints
app.use(router);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ code: "500", message: "Internal Server Error", time: new Date().toISOString() });
});

// Start the server
const port = process.env.PORT || 4010;
app.listen(port, () => {
  console.log(`API Server is running on port ${port}`);
  console.log(`Endpoints:`);
  console.log(`  GET /backoffice/api/v1/users?page=0&size=10`);
  console.log(`  GET /backoffice/api/v1/users/:id`);
  console.log(`  GET /backoffice/api/v1/users/mitra-list`);
  console.log(`  GET /backoffice/api/v1/users/roles`);
  console.log(`  GET /health`);
});