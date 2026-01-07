import { axios } from './axios'

// Example interface for API response
interface User {
  id: number
  name: string
  email: string
}

// Example interface for API response with metadata
interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// Test 1: Using the axios instance with generics
async function testGenericResponseHandler() {
  try {
    // This should work with the generic responseHandler
    const userResponse = await axios.get<User>('/api/user/1')
    console.log('User response data:', userResponse.data) // Type: User
    
    // This should also work with nested response structure
    const apiResponse = await axios.get<ApiResponse<User>>('/api/user/1')
    console.log('API response:', apiResponse.data) // Type: ApiResponse<User>
    console.log('User data:', apiResponse.data.data) // Type: User
    
    // Using post with generics
    const createUserResponse = await axios.post<User>('/api/users', { name: 'John', email: 'john@example.com' })
    console.log('Created user:', createUserResponse.data) // Type: User
    
    console.log('All generic response handler tests passed!')
  } catch (error) {
    console.error('Test failed:', error)
  }
}

// Run the test
testGenericResponseHandler()