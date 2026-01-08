// Simple API mocking using fetch interception
// This is a simplified approach without external dependencies

// Store the original fetch function
const originalFetch = window.fetch;

// Define mock responses for our API endpoints
const mockResponses = {
  '/backoffice/api/v1/auth/login': (request: Request) => {
    return request.json().then((body) => {
      const { email, password } = body;

      // Simple validation
      if (!email || !password) {
        return new Response(
          JSON.stringify({
            code: '400',
            message: 'Email and password are required',
            time: new Date().toISOString(),
            data: null
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Mock successful login response
      if (email === 'admin@example.com' && password === 'password123') {
        return new Response(
          JSON.stringify({
            code: '200',
            message: 'Login successful',
            time: new Date().toISOString(),
            data: {
              email: 'admin@example.com',
              expires_in: 3600, // 1 hour
              role_code: 'ADMIN',
              session_id: 'session_12345',
              token: 'mock_jwt_token_here',
              user_id: 'user_12345'
            }
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Mock failed login response
      return new Response(
        JSON.stringify({
          code: '401',
          message: 'Invalid email or password',
          time: new Date().toISOString(),
          data: null
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    });
  },

  '/backoffice/api/v1/auth/logout': () => {
    return new Response(
      JSON.stringify({
        code: '200',
        message: 'Logout successful',
        time: new Date().toISOString(),
        data: {
          message: 'Successfully logged out'
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Override the fetch function to intercept API calls
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input.toString();

  // Check if this is one of our API endpoints
  for (const [endpoint, mockHandler] of Object.entries(mockResponses)) {
    if (url.includes(endpoint)) {
      // Call the appropriate mock handler
      return await mockHandler(new Request(url, init));
    }
  }

  // For non-mocked endpoints, use the original fetch
  return originalFetch(input, init);
};

console.log('Simple API mocking enabled');