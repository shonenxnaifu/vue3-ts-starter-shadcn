/**
 * Middleware for json-server to format API responses
 */
function middleware(req, res, next) {
  const originalSend = res.send

  res.send = function (body) {
    // Parse response body
    let data = body
    if (typeof body === 'string') {
      try {
        data = JSON.parse(body)
      }
      catch (e) {
        return originalSend.call(this, body)
      }
    }

    // Handle users endpoint with pagination (both direct and mapped routes)
    if ((req.originalUrl.startsWith('/users') || req.originalUrl.includes('/backoffice/api/v1/users')) && req.method === 'GET') {
      if (Array.isArray(data)) {
        // Extract query parameters
        const urlParams = new URLSearchParams(req.url.split('?')[1] || '')

        // Get pagination params (using API format: page=0, size=10)
        const page = Number.parseInt(urlParams.get('page')) || 0
        const size = Number.parseInt(urlParams.get('size')) || 10

        // Calculate pagination
        const totalItems = data.length
        const totalPages = Math.ceil(totalItems / size)

        // Apply pagination
        const startIndex = page * size
        const endIndex = Math.min(startIndex + size, totalItems)
        const paginatedData = data.slice(startIndex, endIndex)

        // Return in API format
        const response = {
          code: '200',
          data: paginatedData,
          message: 'Success',
          meta: {
            page,
            size,
            total_items: totalItems,
            total_pages: totalPages,
          },
          time: new Date().toISOString(),
        }

        return originalSend.call(this, JSON.stringify(response))
      }
    }

    // Handle single user endpoint (both direct and mapped routes)
    if ((req.originalUrl.startsWith('/users/') || req.originalUrl.includes('/backoffice/api/v1/users/')) && req.method === 'GET' && typeof data === 'object' && data.id) {
      const response = {
        code: '200',
        data,
        message: 'Success',
        time: new Date().toISOString(),
      }

      return originalSend.call(this, JSON.stringify(response))
    }

    // Handle health endpoint
    if (req.originalUrl === '/health') {
      const response = {
        code: '200',
        data,
        message: 'OK',
        time: new Date().toISOString(),
      }

      return originalSend.call(this, JSON.stringify(response))
    }

    // For other requests, return as-is
    return originalSend.call(this, body)
  }

  next()
}

module.exports = middleware
