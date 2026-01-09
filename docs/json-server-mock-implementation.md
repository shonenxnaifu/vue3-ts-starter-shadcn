# JSON Server Mock API Implementation

This document summarizes the implementation of a json-server mock API based on the swagger.json specification, replacing the previous Prism mock server setup.

## Overview

The project now includes a json-server mock API implementation that provides:
- Full CRUD operations for users, roles, and mitra entities
- Pagination support with `page` and `size` parameters
- Response formatting according to the API specification
- 25 sample user records for testing pagination
- Health check endpoint

## Implementation Details

### Files Created/Modified

1. **db.json** - Contains mock data with 25 user records and supporting data structures
2. **middleware.cjs** - Formats responses according to API specification
3. **package.json** - Updated with new mock scripts
4. **routes.json** - Maps API endpoints to data resources
5. **README.md** - Documentation for the mock API

### Response Format

All endpoints return data in the following format:
```json
{
  "code": "200",
  "data": [...],
  "message": "Success",
  "meta": {
    "page": 0,
    "size": 10,
    "total_items": 25,
    "total_pages": 3
  },
  "time": "2023-01-01T00:00:00Z"
}
```

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

## Usage

Start the mock server:
```bash
pnpm mock
```

Or run directly:
```bash
npx json-server db.json --port 4010 -m middleware.cjs
```

## Testing Results

The implementation has been tested with 25 user records:
- ✅ Pagination works correctly with different page numbers and sizes
- ✅ Response format matches API specification
- ✅ Total items and total pages calculated correctly
- ✅ Different page sizes handled properly (5, 10, etc.)

Example test results:
- With page=0, size=5: Returns first 5 users (IDs 1-5), total_pages=5
- With page=2, size=5: Returns users 11-15, total_pages=5  
- With page=4, size=5: Returns last 5 users (IDs 21-25), total_pages=5
- With page=1, size=10: Returns users 11-20, total_pages=3

## Limitations

Due to json-server's architecture, the exact API paths from swagger.json (like `/backoffice/api/v1/users`) cannot be directly mapped while preserving query parameter functionality. The current implementation uses the direct endpoints which follow the same data structure and pagination patterns as specified in the swagger.

## Migration from Prism

This implementation replaces the previous Prism mock server setup with a simpler json-server solution that:
- Provides the same API contract compliance
- Offers better control over mock data
- Enables proper pagination testing with realistic datasets
- Maintains compatibility with the existing API specification