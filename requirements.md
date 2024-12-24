# Task: Build an Enterprise-Ready React Todo Application

## Goal

Develop a React application for managing Todo items with the following features.
This task is designed to showcase your ability to implement a modern, scalable,
and maintainable frontend application while keeping enterprise-readiness in
mind.

## FRONTEND

### Requirements

#### Core Business Functionality

- Implement a Todo list with the following fields for each item:
  - Title
  - Status: "Todo", "Doing", or "Done".
- Business Rule:

  - When changing a Todo item’s status to "Done", an approval step
    must be included. For example, this could be a confirmation modal or
    an approval process (use your discretion).

- The user must be able to:
  - Add new Todo items.
  - Edit or delete existing Todo items.
  - Change the status of a Todo item.
  - View Todo items in a user-friendly way, e.g., filtering or grouping by
    status.

#### Enterprise Considerations

- The application should demonstrate features and architecture that align
  with enterprise standards. Think about:
  - Performance: Efficient rendering, lazy loading, and optimized state
    management.
  - Maintainability: Modular code structure, component reusability, and
    clear separation of concerns.
  - Scalability: A design that can grow (e.g., support larger datasets or
    additional features).
  - Security: Follow best practices, e.g., avoid XSS risks.
  - Reliability: Robust error handling and feedback mechanisms (e.g.,
    for failed operations).

#### Technology Stack

- Use React 18 with modern features such as hooks.
- Use a state management solution that you consider appropriate (e.g.,
  Redux, Zustand, Context API, or others).
- Use TypeScript for type safety.
- Optional: Use a component library of your choice (e.g., Fluent UI, Material-
  UI) or design your own components.

#### User Experience (UX)

- The UI should be clean, intuitive, and responsive.
- Consider using animations or transitions to improve the user experience.

#### Testing

- Include unit tests and integration tests for key components. Use a
  framework like Jest, React Testing Library, or Cypress.

#### Documentation

- Provide clear documentation explaining:
  - Your architecture and technology choices.
  - How the application meets enterprise readiness (e.g., scalability,
    performance).
  - Instructions for running the application locally.

#### Bonus (Optional)

- API Integration: Mock the backend using a tool like json-server or fetch
  data from a public API.

- Performance Optimization: Demonstrate optimizations such as code
  splitting, memoization, and lazy loading.
- Accessibility: Ensure your UI meets accessibility standards (e.g., WCAG
  compliance).
