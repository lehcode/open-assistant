<!-- markdownlint-disable MD024 -->
# Project Dependency Rules

## Feature Libraries

Developers should consider feature libraries as libraries that implement smart UI (with access to data sources) for specific business use cases or pages in an application.

### What is it?

A feature library contains a set of files that configure a business use case or a page in an application. Most of the components in such a library are smart components that interact with data sources. This type of library also contains most of the UI logic, form validation code, etc. Feature libraries are almost always app-specific and are often lazy-loaded.

## Naming Convention

`feature` (if nested) or `feature-*` (e.g., `feature-home`).

## Dependency Constraints

A feature library can depend on any type of library.

```shell
libs/
└── my-app/
    └── feature-home/
        └── src/
            ├── index.ts
            └── lib/

```

## UI Libraries

A UI library contains only presentational components (also called _"dumb"_ components).

### What is it?

A UI library is a collection of related presentational components. There are generally no services injected into these components (all of the data they need should come from Inputs).

### Naming Convention

`ui` (if nested) or `ui-*` (e.g., `ui-buttons`)

### Dependency Constraints

A ui library can depend on ui and util libraries.

## Data-Access Libraries

A data-access library contains code for interacting with a back-end system. It also includes all the code related to state management.

### What is it?

Data-access libraries contain code that function as client-side delegate layers to server tier APIs.

All files related to state management also reside in a `data-access` folder (by convention, they can be grouped under a `+state` folder under `src/lib`).

### Naming Convention

`data-access` (if nested) or `data-access-*` (e.g. `data-access-seatmap`)

### Dependency Constraints

A data-access library can depend on data-access and util libraries.

## Utility Libraries

A utility library contains low-level utilities used by many libraries and applications.

### What is it?

A utility library contains low level code used by many libraries. Often there is no framework-specific code and the library is simply a collection of utilities or pure functions.

### Naming Convention

`util` (if nested), or `util-*` (e.g., `util-testing`)

### Dependency Constraints

A utility library can depend only on utility libraries.

An example util lib module: `libs/shared/util-formatting`

```javascript
export { formatDate, formatTime } from './src/format-date-fns';
export { formatCurrency } from './src/format-currency';
```
