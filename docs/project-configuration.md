# ⚙️ Project Configuration

The application has been bootstrapped using `Vite` from simplicity reason. It allows us to create application quickly without dealing with complex tooling setup such as bundling, transpiling etc.

This project is configured with the following tools:

#### ESLint

ESLint is a linting tool for javascript. By providing spesific configuration defined in the `.eslintrc.json` file. It prevents developers from making silly mistakes in their code and enforces consistency in the codebase.

#### Typescript

ESLint is great for catching some of the bugs related to the language, but since JavaScript is a dynamic language ESLint cannot check data that run through the applications, which can lead to bugs, especially on larger projects. That is why TypeScript should be used. It is very useful during large refactors because it reports any issues you might miss otherwise.

#### Absolute imports

Absolute imports should always be configured and used because it makes it easier to move files around and avoid messy import paths such as `../../../components`.

```json
// tsconfig.json
"compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

With this configuration now we can access `src` using `@`. For example, instead of using relative path like this `../../../components/Form`, we can use absolute path like this `@/components/Form`. 👍
