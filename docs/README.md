# Project Documentation Overview

This document provides an overview of all the documentation available in the project and how they relate to each other.

## Table of Contents

1. [Project Structure](./project-structure.md) - Information about the folder organization and where different types of code live
2. [Project Configuration](./project-configuration.md) - Details about the tools and configurations used in the project (ESLint, TypeScript, etc.)
3. [State Management](./state-management.md) - Explanation of different types of state management approaches used in the project
4. [API Calling Guide](./api_call.md) - Comprehensive guide on how to make API calls using the established patterns
5. [Mock API Setup](./mock-api-setup.md) - Instructions for setting up and using the Prism mock server with the Swagger specification
6. [JSON Server Mock Implementation](./json-server-mock-implementation.md) - Documentation for the json-server mock API implementation
7. [API Specification](./swagger.json) - The OpenAPI/Swagger specification that defines the API endpoints

## Relationship Between Documents

- **Project Structure** and **Project Configuration** provide foundational knowledge about how the project is organized and configured
- **State Management** explains how different types of state are handled in the application
- **API Calling Guide** builds on the structure and configuration knowledge to show how to implement API calls
- **Mock API Setup** provides instructions for setting up a local development environment with mock API endpoints
- **Mock Data Setup** details how to configure specific mock data for endpoints
- **API Specification** contains the formal definition of the API contracts that the application communicates with

## Getting Started

New developers should start with:
1. Reading [Project Structure](./project-structure.md) to understand the code organization
2. Reviewing [Project Configuration](./project-configuration.md) to understand the tools used
3. Learning about [State Management](./state-management.md) to understand how data flows through the application
4. Following the [API Calling Guide](./api_call.md) to understand how to implement API interactions
5. Setting up the [Mock API Server](./mock-api-setup.md) for local development

## Contributing to Documentation

When adding new features or making changes to existing functionality, please update the relevant documentation files to keep them current and accurate.