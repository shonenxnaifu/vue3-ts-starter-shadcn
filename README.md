# CMS

## Introduction

Content Management System (CMS) is a software used to manage the creation and modification of digital content. Most of web applications comes with a CMS to make it easier for the maintainer to manage contents.

CMS usually has similar layout including header, sidebar, and navigations. CMS also comes with basic functionalities such as CRUD (Create, Update, and Delete) content, authentication, authorization, etc. It makes developing a CMS is a repetitive tasks.

The goal of this repo is to serve as a template for developing CMS. It is supposed to showcase how to do something in a certain way and help developers to write a better application.

## Tech Stack & Libraries

This starter template uses the following technologies and libraries:

### Core Technologies
- **Vue.js** - v3.3.11 (Progressive JavaScript framework)
- **TypeScript** - v5.2.2 (Typed superset of JavaScript)
- **Vite** - v7.1.7 (Fast build tool)

### UI & Styling
- **Tailwind CSS** - v4.1.13 (Utility-first CSS framework)
- **@tailwindcss/vite** - v4.1.13 (Vite plugin for Tailwind CSS)
- **tw-animate-css** - v1.4.0 (Animation utilities for Tailwind CSS)

### State Management
- **Pinia** - v3.0.3 (Official state management library for Vue)
- **@vueuse/core** - v13.9.0 (Collection of Vue composition utilities)
- **@vueuse/integrations** - v13.9.0 (Integration wrappers for common libraries)

### Routing & Data Fetching
- **Vue Router** - v4.2.5 (Official router for Vue.js)
- **@tanstack/vue-query** - v5.28.0 (Powerful data fetching and state management)

### UI Components & Icons
- **Lucide Vue Next** - v0.562.0 (Icon library)
- **@fortawesome/fontawesome-svg-core** - v7.1.0 (Font Awesome core)
- **@fortawesome/free-solid-svg-icons** - v7.1.0 (Font Awesome solid icons)
- **@fortawesome/free-regular-svg-icons** - v7.1.0 (Font Awesome regular icons)
- **@fortawesome/free-brands-svg-icons** - v7.1.0 (Font Awesome brand icons)
- **@fortawesome/vue-fontawesome** - v3.1.2 (Font Awesome component for Vue)
- **vue-sonner** - v2.0.9 (Accessible toast component)
- **reka-ui** - v2.5.0 (Accessible UI components)

### Data Handling & Validation
- **vee-validate** - v4.12.5 (Form validation library)
- **yup** - v1.3.3 (JavaScript schema builder for value parsing and validation)
- **@internationalized/date** - v3.9.0 (Date and time internationalization utilities)
- **date-fns** - v3.6.0 (Modern JavaScript date utility library)
- **xlsx** - v0.20.3 (Excel file processing library)

### HTTP Client
- **axios** - v1.12.2 (Promise based HTTP client)

### Charts & Visualization
- **chart.js** - v3.9.1 (Charting library)

### Utilities
- **class-variance-authority** - v0.7.0 (Class variant utility)
- **tailwind-merge** - v3.3.1 (Tailwind CSS class merging utility)
- **clsx** - v2.1.0 (Conditional class concatenation utility)
- **nprogress** - v0.2.0 (Progress bar library)
- **universal-cookie** - v7.2.2 (Cookie management library)

### Development & Build Tools
- **vue-tsc** - v3.0.8 (Vue TypeScript type checking)
- **@vitejs/plugin-vue** - v6.0.1 (Vite plugin for Vue)
- **@types/node** - v20.10.4 (TypeScript definitions for Node.js)
- **@types/nprogress** - v0.2.3 (TypeScript definitions for NProgress)
- **@types/file-saver** - v2.0.7 (TypeScript definitions for FileSaver.js)
- **file-saver** - v2.0.5 (Client-side file saving)
- **autoprefixer** - v10.4.16 (PostCSS plugin to parse CSS and add vendor prefixes)

### Linting & Code Quality
- **eslint** - v9.36.0 (JavaScript linter)
- **@antfu/eslint-config** - v5.4.1 (Opinionated ESLint configuration)

### Table Management
- **@tanstack/vue-table** - v8.13.2 (Headless UI library for building powerful tables)

## Table Of Contents

- [⚙️ Project Configuration](docs/project-configuration.md)
- [📄 Project Structure](docs/project-structure.md)
- [🗃️ State Management](docs/state-management.md)

## Run Locally

Clone the project

```bash
  git clone url_project
```

Go to the project directory

```bash
  cd name_folder
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm run dev
```
