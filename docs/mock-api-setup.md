# Mock API Server Setup with Prism

This document explains how to set up and use the Prism mock server with your Swagger/OpenAPI specification for local development and testing.

## Overview

Prism is a powerful API mocking tool that allows you to:
- Mock API endpoints based on your OpenAPI/Swagger specification
- Validate requests and responses against your API contract
- Simulate realistic API behavior without a backend
- Test authentication flows with predefined credentials

## Prerequisites

Before setting up the mock server, ensure you have the following:

- Node.js and npm installed
- Prism CLI installed globally (`npm install -g @stoplight/prism-cli`)
- A valid OpenAPI/Swagger specification file (in this project: `docs/swagger.json`)

## Installation

The Prism CLI has been installed globally in your development environment:

```bash
npm install -g @stoplight/prism-cli
```

## Configuration

### Prism Configuration File

The mock server is configured using `.prismrc.yml` in the project root:

```yaml
# Prism Mock Server Configuration
servers:
  - port: 4010
    host: 0.0.0.0

# Path to the OpenAPI/Swagger specification
spec: ./docs/swagger.json

# Configure the server behavior
mock:
  # Enable CORS
  cors: true
  # Delay responses (in milliseconds) to simulate network latency
  delay: 0
  # Enable dynamic responses based on request data
  dynamic: true

# Configure validation
validation:
  # Validate request bodies
  request: true
  # Validate response bodies
  response: true
```

## Authentication Credentials

The mock server is configured with the following authentication credentials:

- **Email**: `useradmin1@iconpln.co.id`
- **Password**: `123456`

When making requests to the `/backoffice/auth/login` endpoint, use these credentials to receive a mock JWT token.

## Available Scripts

The following npm scripts have been added to `package.json`:

```json
{
  "scripts": {
    // ... other scripts
    "mock": "prism mock ./docs/swagger.json -p 4010",
    "mock:watch": "prism mock ./docs/swagger.json -p 4010 --watch"
  }
}
```

### Script Descriptions

- `npm run mock` - Starts the Prism mock server on port 4010
- `npm run mock:watch` - Starts the mock server in watch mode (restarts when swagger.json changes)

## Starting the Mock Server

### Using npm scripts:

```bash
# Start the mock server with basic functionality
npm run mock

# Start the mock server with dynamic data generation
npm run mock:dynamic

# Or using pnpm
pnpm mock
pnpm mock:dynamic
```

### Using Prism CLI directly:

```bash
# Start the mock server on port 4010
npx prism mock ./docs/swagger.json -p 4010

# Start the mock server with watch mode
npx prism mock ./docs/swagger.json -p 4010 --watch
```

## Testing the Mock Server

Once the server is running, you can test it by making requests to the endpoints defined in your `swagger.json` file.

### Example: Testing the Login Endpoint

```bash
curl -X POST http://localhost:4010/backoffice/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"useradmin1@iconpln.co.id","password":"123456"}'
```

This should return a successful response with a mock JWT token.

## API Endpoints

The mock server serves all endpoints defined in `docs/swagger.json`. Some key endpoints include:

- `POST /backoffice/auth/login` - Authenticate users
- `GET /backoffice/api/v1/users` - Get list of users
- `POST /backoffice/api/v1/users` - Create a new user
- `GET /backoffice/api/v1/users/{id}` - Get user by ID
- `PUT /backoffice/api/v1/users/{id}` - Update user
- `DELETE /backoffice/api/v1/users/{id}` - Delete user

## Integration with Frontend Development

To use the mock server with your Vue application:

1. Update your `.env.development` file to point to the mock server:
   ```
   VITE_API_BASE_URL=http://localhost:4010
   ```

2. Restart your development server to pick up the new environment variable.

3. Your application will now make API calls to the mock server instead of a real backend.

## Mock Data

The mock server includes sample data for various endpoints:

### Users Endpoint

The `/backoffice/api/v1/users` endpoint returns 50 sample user records with the following structure:
- id: Unique identifier
- name: Full name of the user
- email: Email address
- role: User role (admin, manager, user)
- type: User type (internal, mitra)
- active: Boolean indicating if the user is active
- created_at: Creation timestamp
- updated_at: Last update timestamp

### Pagination

The users endpoint supports pagination parameters:
- `page`: Page number (0-indexed, default: 0)
- `size`: Page size (number of items per page, default: 10)
- `type`: User type filter (internal, mitra)

The response includes metadata with pagination information:
- `page`: Current page number (0-indexed)
- `size`: Number of items per page
- `total_items`: Total number of users in the system (50)
- `total_pages`: Total number of pages available (5)

Example request:
```bash
curl -X GET "http://localhost:4010/backoffice/api/v1/users?type=internal&page=0&size=10" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dummy-token"
```


## Troubleshooting

### Common Issues

- **Port already in use**: If port 4010 is already in use, change the port in the command or terminate the other process.
- **Invalid Swagger file**: Ensure your `docs/swagger.json` file is a valid OpenAPI/Swagger specification.
- **Authentication not working**: Verify that you're sending the correct credentials to the login endpoint.
- **Mock data not showing**: The mock server returns generic data based on the API specification. For more specific mock data, see the [Mock Data Setup](./mock-data-setup.md) documentation.

### Verifying the Server is Running

Check if the server is running by visiting an endpoint:

```bash
curl -I http://localhost:4010/backoffice/auth/login
```

You should receive a response header indicating the server is active.