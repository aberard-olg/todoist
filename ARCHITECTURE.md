# Todoist Clone - Architecture Guide

## Overview

This is an educational Todoist clone built with React and Firebase. It demonstrates modern React patterns including hooks, context API, and real-time database synchronization.

## Project Structure

```
src/
├── components/              # React components
│   ├── AddProject.js       # Component to add new projects
│   ├── AddTask.js          # Component to add new tasks
│   ├── Checkbox.js         # Reusable checkbox component
│   ├── IndividualProject.js # Individual project display
│   ├── ProjectOverlay.js   # Project overlay/modal
│   ├── Projects.js         # Projects list component
│   ├── TaskDate.js         # Task date component
│   ├── Tasks.js            # Tasks list component
│   └── layout/             # Layout components
│       ├── Content.js      # Main content area
│       ├── Header.js       # Application header
│       └── Sidebar.js      # Sidebar navigation
├── context/                # React Context for state management
│   ├── projects-context.js # Projects state context
│   └── selected-project-context.js # Selected project context
├── hooks/                  # Custom React hooks
│   └── index.js           # useTasks and useProjects hooks
├── helpers/                # Utility helper functions
│   └── index.js           # Helper functions for projects and tasks
├── constants/              # Application constants
│   └── index.js           # Collated tasks, project keys, date format
├── __tests__/              # Test files
├── App.js                  # Main App component
├── App.scss                # App styling
├── index.js                # React entry point
└── firebase.js             # Firebase configuration (not in repo)
```

## Key Concepts

### State Management

The application uses React Context API for global state management:

- **ProjectsContext**: Manages the list of all projects
- **SelectedProjectContext**: Manages the currently selected project

### Custom Hooks

#### `useTasks(selectedProject)`
Fetches and manages tasks for a selected project. Handles:
- Real-time synchronization with Firebase
- Filtering tasks by project, date, or collated task type
- Separating archived and active tasks
- Loading and error states

**Returns:**
```javascript
{
  tasks: Array,        // Active tasks
  archivedTasks: Array, // Archived tasks
  loading: boolean,    // Loading state
  error: Error|null    // Error object if fetch failed
}
```

#### `useProjects()`
Fetches and manages projects for the current user.

**Returns:**
```javascript
{
  projects: Array,     // User's projects
  setProjects: Function, // Update projects
  loading: boolean,    // Loading state
  error: Error|null    // Error object if fetch failed
}
```

### Collated Tasks

Special project types that group tasks by criteria:
- **INBOX**: Tasks with no date
- **TODAY**: Tasks with today's date
- **NEXT_7**: Tasks within the next 7 days

These are defined in `src/constants/index.js` and use the `PROJECT_KEYS` object.

### Date Format

All dates are stored and formatted as `DD/MM/YYYY` using moment.js. This is defined in the `DATE_FORMAT` constant.

## Firebase Integration

The application uses Firebase Firestore for:
- **Collections:**
  - `projects`: User's projects
  - `tasks`: User's tasks

- **Authentication:** Currently uses a hardcoded user ID (`DEFAULT_USER_ID`). This should be replaced with proper Firebase authentication.

### Data Models

**Project:**
```javascript
{
  projectId: string,    // Unique project identifier
  projectName: string,  // Display name
  userId: string,       // Owner's user ID
  docId: string         // Firestore document ID
}
```

**Task:**
```javascript
{
  task: string,         // Task description
  projectId: string,    // Associated project ID
  date: string,         // Date in DD/MM/YYYY format
  archived: boolean,    // Archive status
  userId: string        // Owner's user ID
}
```

## Setup Instructions

### Prerequisites
- Node.js 12+
- npm or yarn
- Firebase project

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `src/firebase.js` with your Firebase configuration:
   ```javascript
   import firebase from 'firebase/app';
   import 'firebase/firestore';

   const firebaseConfig = {
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_AUTH_DOMAIN',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_STORAGE_BUCKET',
     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
     appId: 'YOUR_APP_ID',
   };

   firebase.initializeApp(firebaseConfig);

   export { firebase };
   ```

4. Update `DEFAULT_USER_ID` in `src/constants/index.js` or implement proper authentication

5. Start the development server:
   ```bash
   npm start
   ```

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```

## Code Quality

- **ESLint**: Airbnb style guide with custom rules
- **Prettier**: Code formatting
- **Jest**: Testing framework with 90% coverage threshold
- **React Testing Library**: Component testing

## Future Improvements

1. **Authentication**: Replace hardcoded user ID with Firebase Authentication
2. ~~**Error Handling**: Add comprehensive error handling and user feedback~~ ✅ Done - Added error handling to all Firebase operations
3. **Performance**: Implement React.memo and useMemo for optimization
4. **Accessibility**: Improve keyboard navigation and ARIA labels
5. **React Upgrade**: Update to React 18+ for better performance
6. **Type Safety**: Consider migrating to TypeScript
7. **Testing**: Increase test coverage for hooks and context
8. **Error Boundaries**: Add error boundaries for better error handling
9. **Loading States**: Add loading indicators using the new loading states from hooks

## Contributing

When contributing to this project:
1. Follow the existing code style (ESLint + Prettier)
2. Add tests for new features
3. Update documentation as needed
4. Ensure all tests pass before submitting PR
