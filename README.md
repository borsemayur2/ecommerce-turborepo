# Ecommerce Microservices and Frontend App

Created using Turborepo with multiple meta-frameworks all working in harmony and sharing packages.

## Get started

> Set variables in `.env` file (refer `.env.example`)

### Install all packages

```sh
pnpm install
```

### Run all the workspaces concurrently:

```sh
pnpm dev
```

This will run microservices at ports `8001`, `8002`, `8003` and the frontend at port `3000`

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `auth-service`: authentication microservice
- `product-service`: product microservice
- `order-service`: order microservice
- `storefront`: Frontend App created using Next.js
- `logger`: isomorphic logger (a small wrapper around console.log)
- `ui`: a dummy React UI library (which contains a single `<CounterButton>` component)
- `api-utils`: Shared utilities for the microservices
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json;s used throughout the monorepo

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
