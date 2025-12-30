# API Calling Guide for Vue Project

This document provides comprehensive guidance on how to make API calls in this Vue 3 project using the established patterns and best practices with a focus on module-based architecture.

## Project Architecture Overview

The project uses the following technologies for API calls:
- **Axios** for HTTP requests
- **Vue Query (@tanstack/vue-query)** for server state management
- **Pinia** for client state management
- **TypeScript** for type safety
- **Module-based structure** for organizing code by feature/domain

## API Infrastructure

### 1. Axios Configuration

The project has a centralized Axios instance configured in `src/libs/axios.ts` with:
- Base URL set to `/api` or environment-specific URL
- Request/response interceptors
- Authentication token handling
- Error handling with automatic redirects for 401 errors

```typescript
// src/libs/axios.ts
import type { AxiosError, AxiosResponse } from 'axios'
import Axios from 'axios'
import { useAuthStore } from '@/stores'

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptors for request and response handling
axios.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.cookies.get('token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
}, errorHandler)

axios.interceptors.response.use(responseHandler, errorHandler)
```

### 2. Vue Query Configuration

Vue Query is configured in `src/libs/vue-query.ts` with default options:
- staleTime: 2000ms
- retry: 0
- refetchOnWindowFocus: false

## Module-Based Structure (Recommended for Multiple Features)

When working with multiple modules/features/domains, it's recommended to organize API calls and composables within each feature module. This approach provides better maintainability and scalability.

### Recommended Module Structure

```
src/
├── modules/
│   ├── user/
│   │   ├── api/
│   │   │   ├── userService.ts
│   │   │   ├── userEndpoints.ts
│   │   │   └── index.ts
│   │   ├── composables/
│   │   │   ├── useUserQuery.ts
│   │   │   ├── useUserMutations.ts
│   │   │   └── index.ts
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   │   ├── user.types.ts
│   │   │   └── index.ts
│   │   ├── store/
│   │   │   └── userStore.ts
│   │   └── index.ts
│   ├── product/
│   │   ├── api/
│   │   ├── composables/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   └── index.ts
│   └── order/
│       ├── api/
│       ├── composables/
│       ├── components/
│       ├── pages/
│       ├── types/
│       └── index.ts
```

### Example Implementation

Here's how to structure a complete user module:

```typescript
// src/modules/user/types/user.types.ts
export interface User {
  id: string
  name: string
  email: string
}

export interface UserListResponse {
  data: User[]
  total: number
  page: number
  size: number
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
}
```

```typescript
// src/modules/user/api/userService.ts
import { axios } from '@/libs/axios'
import type { User, UserListResponse, CreateUserRequest } from '@/modules/user/types'

// GET all users
export const getUsers = (params?: { page?: number; size?: number; search?: string }) => {
  return axios.get<UserListResponse>('/users', { params })
}

// GET user by ID
export const getUserById = (id: string) => {
  return axios.get<User>(`/users/${id}`)
}

// POST new user
export const createUser = (data: CreateUserRequest) => {
  return axios.post<User>('/users', data)
}

// PUT update user
export const updateUser = (id: string, data: Partial<CreateUserRequest>) => {
  return axios.put<User>(`/users/${id}`, data)
}

// DELETE user
export const deleteUser = (id: string) => {
  return axios.delete(`/users/${id}`)
}
```

```typescript
// src/modules/user/composables/useUserQuery.ts
import type { UseQueryReturnType } from '@tanstack/vue-query'
import type { User } from '@/modules/user/types'
import { useQuery } from '@tanstack/vue-query'
import { getUserById } from '@/modules/user/api'

export function useUserQuery(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId).then(res => res.data),
    enabled: !!userId,
  }) as UseQueryReturnType<User, Error>
}
```

```typescript
// src/modules/user/composables/useUserMutations.ts
import type { UseMutationOptions } from '@tanstack/vue-query'
import type { User, CreateUserRequest } from '@/modules/user/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUser, updateUser, deleteUser } from '@/modules/user/api'

export function useUserMutations() {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (userData: CreateUserRequest) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
```

```typescript
// src/modules/user/index.ts
// Export everything from the module for easy imports
export * from './api'
export * from './composables'
export * from './types'
```

### Vue Query Examples with Module Structure

#### Simple Query in Component
```vue
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getUsers, type User } from '@/modules/user/api'

const { data: users, isLoading, error, refetch } = useQuery({
  queryKey: ['users'],
  queryFn: () => getUsers().then(res => res.data.data),
  staleTime: 5 * 60 * 1000, // 5 minutes
})
</script>

<template>
  <div>
    <div v-if="isLoading">Loading users...</div>
    <div v-else-if="error">Error: {{ (error as Error).message }}</div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

#### Query with Parameters
```vue
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getUserById, type User } from '@/modules/user/api'

const props = defineProps<{
  userId: string
}>()

const { data: user, isLoading, error } = useQuery({
  queryKey: ['user', props.userId],
  queryFn: () => getUserById(props.userId).then(res => res.data),
  enabled: !!props.userId, // Only run query if userId exists
})
</script>
```

#### Infinite Query (for pagination)
```typescript
import { useInfiniteQuery } from '@tanstack/vue-query'
import { getUsers, type UserListResponse } from '@/modules/user/api'

interface SearchParams {
  search?: string
}

export function useUsersInfiniteQuery(params: SearchParams) {
  return useInfiniteQuery({
    queryKey: ['users-infinite', params],
    queryFn: ({ pageParam = 1 }) => {
      return getUsers({
        ...params,
        page: pageParam,
        size: '10'
      }).then(res => res.data)
    },
    getNextPageParam: (lastPage, allPages) => {
      // Logic to determine if there's a next page
      if (lastPage.data.length < 10) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
  })
}
```

### Mutation Examples with Module Structure

#### Create Mutation
```vue
<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createUser, type CreateUserRequest, type User } from '@/modules/user/api'

const queryClient = useQueryClient()

const createMutation = useMutation({
  mutationFn: (userData: CreateUserRequest) => createUser(userData),
  onSuccess: () => {
    // Invalidate and refetch user list
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
</script>
```

#### Update Mutation
```vue
<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { updateUser, type User } from '@/modules/user/api'

const queryClient = useQueryClient()

const updateMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
    updateUser(id, data),
  onSuccess: (_, variables) => {
    // Update the specific user in cache
    queryClient.setQueryData(['user', variables.id], variables.data)
    // Or invalidate the user list
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
</script>
```

#### Delete Mutation
```vue
<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteUser } from '@/modules/user/api'

const queryClient = useQueryClient()

const deleteMutation = useMutation({
  mutationFn: (id: string) => deleteUser(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})
</script>
```

### Benefits of Module-Based Structure

1. **Feature Co-location**: All code related to a specific feature is in one place, making it easier to understand and maintain
2. **Scalability**: Each module is self-contained and can grow independently
3. **Team Collaboration**: Different team members can work on different modules without conflicts
4. **Reusability**: Modules can be more easily extracted or reused in other projects
5. **Clear Boundaries**: Clear separation between different features/domains
6. **Type Safety**: Types are co-located with the API and composables that use them

### Cross-Module Communication

For shared utilities or cross-module concerns, you can still maintain:

```
src/
├── api/           // For truly shared API utilities
├── composables/   // For truly shared composables
├── utils/         // For shared utilities
├── types/         // For shared types
└── modules/       // Feature-specific code
```

## Environment Configuration

API base URLs can be configured using environment variables in `.env` files:

```env
# .env.development
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com

# .env.production
VITE_API_BASE_URL=https://api.yourapp.com
```

Update the axios configuration to use environment variables:

```typescript
export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
```

## Error Handling

The project has centralized error handling in the Axios interceptors, but you can also handle errors at the component level:

```vue
<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getUsers } from '@/modules/user/api'

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => getUsers().then(res => res.data.data),
})

// Handle specific error types
if (error.value) {
  if (error.value.status === 401) {
    // Redirect to login handled by interceptor
  } else if (error.value.status === 404) {
    console.error('Users not found')
  } else {
    console.error('An error occurred:', error.value.message)
  }
}
</script>
```

## Best Practices

1. **Use Vue Query for server state**: Always prefer Vue Query over manual API calls for data fetching
2. **Organize by feature/module**: Use the module-based structure to organize API calls by domain/feature
3. **Use TypeScript interfaces**: Define clear types for request/response objects within each module
4. **Create custom composables**: Encapsulate complex API logic in reusable composables within each module
5. **Handle loading and error states**: Always provide feedback to users
6. **Use query keys consistently**: Follow a consistent pattern for query keys (e.g., `['feature', id]`)
7. **Invalidate queries after mutations**: Keep data fresh by invalidating related queries
8. **Use enabled option**: Conditionally run queries based on dependencies
9. **Configure appropriate stale times**: Balance between fresh data and performance
10. **Centralize error handling**: Use interceptors for common error scenarios

## Testing API Calls

When testing components that make API calls, mock the API services:

```typescript
// Example test file
import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserList from '@/modules/user/components/UserList.vue'

vi.mock('@/modules/user/api', () => ({
  getUsers: vi.fn(() => Promise.resolve({ data: { data: [] } })),
}))

describe('UserList', () => {
  it('renders loading state', async () => {
    const wrapper = mount(UserList)
    expect(wrapper.find('.loading').exists()).toBe(true)
  })
})
```

## Summary

This documentation provides a comprehensive guide to implementing API calls in your Vue project using Vue Query with environment variable configuration and a module-based structure. The examples demonstrate:

1. How to configure Axios with environment variables
2. How to create API service files organized by feature/module
3. How to implement queries and mutations with Vue Query within modules
4. How to create custom composables for reusable API logic within modules
5. How to handle loading and error states properly
6. How to use infinite queries for pagination
7. How to organize code using a module-based structure for better maintainability

The module-based structure approach is recommended for projects with multiple features or domains, providing better organization, scalability, and maintainability.