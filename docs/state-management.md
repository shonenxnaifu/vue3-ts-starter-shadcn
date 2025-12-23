# 🗃️ State Management

There is no need to keep all of your state in a single centralized store. There are different needs for different types of state that can be split into several types:

## Component State

This is the state that is only needed by a component and is not meant to shared to be shared to anywhere else. For this type of state, you only need:

- [ref()](https://vuejs.org/api/reactivity-core#ref) - for simple state
- [reactive()](https://vuejs.org/api/reactivity-core#reactive) for more complex state

## Application State

This is the state that controls interactive parts of an application. Notification, color mode, etc. We use Pinia as the solution in this project.

#### [Pinia](https://pinia.vuejs.org)

Pinia is library for managing and centralizing application state. With Pinia, the state of application is kept in a store and can be accessed from any component.

[Auth State Example](../src/stores/useAuthStore.ts)

## Form State

This is a state that helps in managing users inputs in a form. Handling a form with many inputs could become problematic. We use Vee Validate to handle form state in this project.

#### [Vee Validate](https://vee-validate.logaretm.com)

Formik is library for managing form state. Instead of having multiple `ref()`, we could have one form state that store all input values. Vee Validate also has many usefull feature e.g. validation.

## Server Cache State

This is the state that comes from the server which is being cached on the client for further usage. It is possible to store remote data inside a state management store such as pinia, but there are better solutions for that. In this project we use vue-query to handle data-fetching and manage cache state.

#### [Vue Query](https://tanstack.com/query/v5/docs/framework/vue/overview)

Vue Query is a data-fetchig library that equipped with features like caching, synchronizing and updating server state.
