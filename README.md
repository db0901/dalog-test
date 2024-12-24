# Todo Application Documentation

## Overview

This is a modern Todo application built with React, TypeScript, and Material-UI. It features a Kanban-style board with three columns (Todo, Doing, Done) and provides comprehensive task management capabilities.

## Features

### Task Management

- Create new todos
- Edit todo titles
- Move todos between status columns (Todo → Doing → Done)
- Delete todos
- Approval dialog when marking tasks as Done

### User Interface

- Responsive layout with Material-UI components
- Search functionality for filtering todos
- Loading states with skeleton screens
- Error handling with snackbar notifications
- Empty state messaging

## Technical Architecture

### Core Technologies

- React 18
- TypeScript
- Material-UI (MUI)
- Vite
- JSON Server (Backend)
- Vitest (Testing)

### State Management

The application uses React Context for state management through two main contexts:

- **TodoStateContext**: Manages the application state
- **TodoActionsContext**: Provides actions to modify the state

### API Service

The todoService handles all HTTP requests to the backend:

- `GET /todos` - Fetch all todos
- `POST /todos` - Create new todo
- `PATCH /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

Base URL: `http://localhost:3001`

## Components

### TodoLayout

Main layout component that organizes the application structure.

### TodoList

Displays todos in a Kanban board style with three columns.

Key features:

- Responsive grid layout
- Loading states
- Error handling
- Empty state messaging

### TodoItem

Individual todo card component with features:

- In-line editing
- Status management
- Delete functionality
- Approval dialog for completion

### CreateTodo

Form component for creating new todos with validation.

### SearchBar

Search functionality with real-time filtering.

## Testing

The application includes comprehensive unit tests using Vitest and React Testing Library. Test files are co-located with their components.

## Getting Started

### Installation Steps

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the backend server:

   ```bash
   npm run server
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Available Scripts

| Command           | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start development server  |
| `npm run build`   | Build for production      |
| `npm run preview` | Preview production build  |
| `npm run server`  | Start JSON Server backend |
| `npm run test`    | Run tests                 |

## Error Handling

The application implements comprehensive error handling:

- API errors are caught and displayed via snackbar notifications
- Loading states prevent user interaction during API calls
- Form validation prevents invalid data submission
