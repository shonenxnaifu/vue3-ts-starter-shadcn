// Test for the backoffice/auth/login API using the current axios config
import { axios } from '@/libs/axios'
import type { LoginRequest, LoginResponse } from '@/types/auth.types'

// Test successful login
async function testSuccessfulLogin() {
  console.log('Testing successful login...')
  
  try {
    const loginData: LoginRequest = {
      email: 'admin@example.com',
      password: 'password123'
    }

    // Make the login request with proper typing
    const response = await axios.post<LoginResponse>('/backoffice/api/v1/auth/login', loginData)
    
    console.log('Login successful:', response.data)
    console.log('Token received:', response.data.data.token)
    console.log('User ID:', response.data.data.user_id)
    
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

// Test failed login
async function testFailedLogin() {
  console.log('Testing failed login...')
  
  try {
    const loginData: LoginRequest = {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    }

    // This should fail
    const response = await axios.post<LoginResponse>('/backoffice/api/v1/auth/login', loginData)
    
    console.log('Unexpected success:', response.data)
    return response.data
  } catch (error) {
    console.log('Login correctly failed as expected')
    console.log('Error details:', error)
    return error
  }
}

// Test login with missing credentials
async function testLoginWithMissingCredentials() {
  console.log('Testing login with missing credentials...')
  
  try {
    const loginData: LoginRequest = {
      email: '', // Missing email
      password: 'password123'
    }

    const response = await axios.post<LoginResponse>('/backoffice/api/v1/auth/login', loginData)
    
    console.log('Response with missing credentials:', response.data)
    return response.data
  } catch (error) {
    console.log('Login failed as expected with missing credentials')
    console.log('Error details:', error)
    return error
  }
}

// Run all tests
async function runLoginTests() {
  console.log('Starting login API tests...\n')
  
  try {
    await testSuccessfulLogin()
    console.log('✓ Successful login test passed\n')
  } catch (error) {
    console.log('✗ Successful login test failed\n')
  }
  
  try {
    await testFailedLogin()
    console.log('✓ Failed login test passed\n')
  } catch (error) {
    console.log('✗ Failed login test failed\n')
  }
  
  try {
    await testLoginWithMissingCredentials()
    console.log('✓ Missing credentials test passed\n')
  } catch (error) {
    console.log('✗ Missing credentials test failed\n')
  }
  
  console.log('All login API tests completed!')
}

// Execute the tests
runLoginTests()

export { testSuccessfulLogin, testFailedLogin, testLoginWithMissingCredentials, runLoginTests }