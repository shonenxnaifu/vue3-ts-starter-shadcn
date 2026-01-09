# JSON Server Mock API

This project implements a mock API server based on the swagger.json specification using json-server.

## Features

- Full CRUD operations for users, roles, and mitra entities
- Pagination support with `page` and `size` parameters
- Response formatting according to the API specification
- Health check endpoint

## Endpoints

### Users
- `GET /users` - Get all users with pagination
- `GET /users/:id` - Get a specific user
- `GET /users?search=:term` - Search users
- `GET /users?type=:type` - Filter users by type (internal/mitra)

### Other Endpoints
- `GET /mitra_list` - Get list of mitra companies
- `GET /roles` - Get list of roles
- `GET /health` - Health check

## Pagination

All list endpoints support pagination with the following parameters:
- `page` - Page number (0-indexed)
- `size` - Items per page (default: 10)

Example: `GET /users?page=0&size=5`

Response format:
```json
{
  "code": "200",
  "data": [...],
  "message": "Success",
  "meta": {
    "page": 0,
    "size": 5,
    "total_items": 25,
    "total_pages": 5
  },
  "time": "2023-01-01T00:00:00Z"
}
```

## Limitations

Due to json-server's architecture, the exact API paths from swagger.json (like `/backoffice/api/v1/users`) cannot be directly mapped while preserving query parameter functionality. The current implementation uses the direct endpoints which follow the same data structure and pagination patterns as specified in the swagger.

## Usage

Start the mock server:
```bash
pnpm mock
```

Or run directly:
```bash
npx json-server db.json --port 4010 -m middleware.cjs
```