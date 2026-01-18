# Admin Dashboard - Internship Assignment

A pre-built admin dashboard with **intentional bugs** and **incomplete features** for you to fix and complete.

## Live Demo
https://admin-dashboard-assignment-ebon.vercel.app

## GitHub Repository
https://github.com/vinayakerkar-1004/admin-dashboard-assignment

---

## Quick Start

```bash
# Install dependencies
npm install

# Initialize MSW (required for mock API)
npx msw init public --save

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety (strict mode) |
| Material React Table (MRT) | Data Grid |
| Material UI | Component Library |
| React Query | Data Fetching & Caching |
| MSW | Mock API |
| React Router v6 | Routing |
| Notistack | Toast Notifications |

## Project Structure

```
src/
├── api/                  # API calls
├── components/
│   └── tables/           # Table components (DynamicGrid, UserActions)
├── hooks/                # Custom hooks (useUsers, useDebounce)
├── layouts/              # Page layouts
├── mocks/                # MSW mock handlers
├── pages/
│   └── UsersPage/        # Users page
├── types/                # TypeScript types
├── utils/                # Utilities & column config
├── App.tsx
├── main.tsx
└── routes.tsx
```

## Your Tasks

See **ASSIGNMENT.md** for detailed instructions.

### Summary

| Task Type | Count | Skills Tested |
|-----------|-------|---------------|
| Bug Fixes | 3 | Debugging, React Query, MRT |
| Complete Features | 3 | Pattern following |
| Build New | 2 | Independent thinking |

## Submission

1. Fix all bugs and complete features
2. Make separate commits for each fix/feature
3. Update this README with your changes
4. Deploy to Vercel/Netlify
5. Submit repo link + live demo

---

## All items below have been completed as part of this submission.

---

## Changes Made

###  Bug Fixes

#### 1. Table Not Refreshing After Status Update
- **Issue**: After activating or deactivating a user, the success snackbar was shown but the users table did not reflect the updated status until a page refresh.
- **Cause**: React Query was serving cached user data because the users query was not invalidated after the status update mutation.
- **Fix**: Added proper cache invalidation using `useQueryClient` to refetch the users list after a successful mutation.
- **File Updated**: `src/hooks/useUsers.ts`

#### 2. Groups Column Displaying `[object Object]`
- **Issue**: The “Groups” column displayed `[object Object]` instead of readable group names.
- **Cause**: Group objects were being rendered directly using `toString()` instead of accessing the correct display property.
- **Fix**: Updated the chip renderer to use the `groupName` property for both the chip label and key.
- **File Updated**: `src/components/tables/DynamicGrid.tsx`

#### 3. Pagination and Filters Not Synced with URL
- **Issue**: Pagination and status filters were not reflected in the URL, and refreshing the page reset the state to defaults.
- **Cause**: Page and filter state were stored only in local React state and URL parameters were applied after initial render.
- **Fix**: Synced pagination and filter state with URL query parameters using `useSearchParams`, ensuring state persistence across refresh and shareable URLs.
- **File Updated**: `src/pages/UsersPage/UsersPage.tsx`

---

###  Completed Features

#### 1. Debounced Search Input
- **Issue**:The search input triggered an API request on every keystroke, leading to excessive network calls.
- **Cause**: The search query state was passed directly to the data-fetching hook without any debounce mechanism.
- **Fix**: Implemented a 300ms debounce using the provided useDebounce hook and passed the debounced value to the users query.
- **Result**: API calls are triggered only after the user stops typing.
Improved performance and smoother user experience
- **Files Updated**: `src/hooks/useDebounce.ts`
`src/pages/UsersPage/UsersPage.tsx`

#### 2. Table Loading Skeleton
- **Issue**: While fetching data, the users table displayed a generic loading spinner, causing layout shifts.
- **Cause**: The table relied on the default loading indicator provided by the data grid.
- **Fix**: Replaced the spinner with a table-shaped loading skeleton using MUI Skeleton, rendered conditionally during data loading.
- **Result**: 
    - Immediate visual feedback during data fetch.
    - No layout jump when the table data loads
-  **Files Updated**: `src/components/common/TableSkeleton.tsx`
`src/components/common/index.ts`
`src/components/index.ts`
`src/pages/UsersPage/UsersPage.tsx`

#### 3. Optimistic UI for Status Toggle
- **Issue**:User status updates were reflected in the UI only after the API response, resulting in a noticeable delay.
- **Cause**: The UI relied entirely on query invalidation and refetching after the mutation completed.
- **Fix**: Implemented optimistic updates using React Query’s onMutate, onError, and onSettled callbacks to update the cache immediately and rollback on failure.
- **Result**: Status updates instantly on user interaction.
Automatic rollback if the API request fails.
- **Files Updated**: `src/hooks/useUsers.ts`

---

###  New Features

#### 1.  Actions Column with Status Toggle
- **Issue**: The Actions column existed but lacked clear visual feedback, accessibility support, and safeguards against accidental user deactivation.
- **Cause**: The initial implementation used basic action buttons without hover states, keyboard accessibility, or confirmation for destructive actions.
- **Fix**: Enhanced the Actions column by improving hover states using MUI theming, adding proper aria-labels for accessibility, enabling full keyboard navigation, and introducing a confirmation dialog before deactivating a user.
- **Result**: Clear visual feedback on hover for activate/deactivate actions.
Improved accessibility for keyboard and screen-reader users.
Prevented accidental deactivation through confirmation dialog while keeping activation fast and seamless.
- **Files Updated**: `src/components/tables/UserActions.tsx`
`src/pages/UsersPage/UsersPage.tsx`

#### 2.  Error Handling
- **Issue**: The application did not gracefully handle runtime or API errors. API failures could leave the UI in an inconsistent state, and users had no way to retry failed requests without reloading the page.
- **Cause**: There was no global error boundary for runtime crashes, and API error states were handled minimally without recovery options.
- **Fix**: 
    - Added a global ErrorBoundary component to catch unexpected runtime errors and display a fallback UI.
    - Improved API error handling for user fetch and status update operations.
    - Implemented user-friendly error messages with retry support using React Query’s refetch method.
    - Ensured mutation failures trigger proper rollback and snackbar error notifications without crashing the app.
- **Result**: 
    - The application no longer crashes on runtime errors.
    - Clear, user-friendly error messages are displayed on API failures.
    - Users can retry failed requests without a full page reload.
    - Status update failures rollback safely while keeping the UI responsive.
- **Files Updated**: `src/components/ErrorBoundary.tsx`
`src/main.tsx`
`src/hooks/useUsers.ts`
`src/pages/UsersPage/UsersPage.tsx`

---

### Bonus Features

## Bonus A: Persist State in URL/localStorage
- **Issue**: Table state (pagination, sorting, filters) and column visibility were reset on page refresh failed requests without reloading the page.
- **Cause**: State was managed locally without syncing to the URL or persisting user preferences.
- **Fix**: Synced pagination, filters, search, and sorting to the URL. Persisted column visibility in localStorage.
- **Result**: Table state is preserved on refresh and shareable via URL. Column visibility remains consistent across sessions.
- **Files Updated**: `src/pages/UsersPage/UsersPage.tsx`
`src/components/tables/DynamicGrid.tsx`

## Bonus B: Unit Test
- **Issue**: Core logic like debounced search and dynamic table cell rendering was untested, risking regressions.
- **Cause**: No existing test setup and complex third-party table components made direct testing difficult.
- **Fix**: Added unit tests using Vitest and React Testing Library for the useDebounce hook and metadata-driven DynamicGrid column rendering.
- **Result**: Debounce behavior and Groups column rendering are now regression-safe and verified.
- **Files Added**: `src/hooks/__tests__/useDebounce.test.tsx`
`src/components/tables/__tests__/DynamicGrid.test.tsx`

## Bonus C: Role-Based UI
- **Issue**: All users could access status actions and admin users were not visually identifiable.
- **Fix**: Added role-based checks derived from user groups to restrict actions to admins only, prevented admin-to-admin deactivation, and introduced a visual Admin badge in the table.
- **Result**: Actions are permission-aware and admin users are clearly distinguished in the UI.
- **Files Added**: `src/utils/roleUtils.ts`
- **Files Updated**: `src/components/tables/UserActions.tsx`
`src/components/tables/DynamicGrid.tsx`