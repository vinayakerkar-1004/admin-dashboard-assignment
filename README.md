# Admin Dashboard - Internship Assignment

A pre-built admin dashboard with **intentional bugs** and **incomplete features** for you to fix and complete.

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

## Changes Made

### 🐞 Bug Fixes

#### 1. Table Not Refreshing After Status Update
- **Issue**: After activating or deactivating a user, the success snackbar was shown but the users table did not reflect the updated status until a page refresh.
- **Cause**: React Query was serving cached user data because the users query was not invalidated after the status update mutation.
- **Fix**: Added proper cache invalidation using `useQueryClient` to refetch the users list after a successful mutation.
- **File Updated**: `src/hooks/useUsers.ts`

---

#### 2. Groups Column Displaying `[object Object]`
- **Issue**: The “Groups” column displayed `[object Object]` instead of readable group names.
- **Cause**: Group objects were being rendered directly using `toString()` instead of accessing the correct display property.
- **Fix**: Updated the chip renderer to use the `groupName` property for both the chip label and key.
- **File Updated**: `src/components/tables/DynamicGrid.tsx`

---

#### 3. Pagination and Filters Not Synced with URL
- **Issue**: Pagination and status filters were not reflected in the URL, and refreshing the page reset the state to defaults.
- **Cause**: Page and filter state were stored only in local React state and URL parameters were applied after initial render.
- **Fix**: Synced pagination and filter state with URL query parameters using `useSearchParams`, ensuring state persistence across refresh and shareable URLs.
- **File Updated**: `src/pages/UsersPage/UsersPage.tsx`

---

### ✨ Completed Features

#### 1. Debounced Search Input
- **Issue**:The search input triggered an API request on every keystroke, leading to excessive network calls.
- **Cause**: The search query state was passed directly to the data-fetching hook without any debounce mechanism.
- **Fix**: Implemented a 300ms debounce using the provided useDebounce hook and passed the debounced value to the users query.
- **Result**: API calls are triggered only after the user stops typing.
Improved performance and smoother user experience

-**Files Updated**: `src/hooks/useDebounce.ts`
`src/pages/UsersPage/UsersPage.tsx`

---

#### 1. Table Loading Skeleton
- **Issue**: While fetching data, the users table displayed a generic loading spinner, causing layout shifts.
- **Cause**: The table relied on the default loading indicator provided by the data grid.
- **Fix**: Replaced the spinner with a table-shaped loading skeleton using MUI Skeleton, rendered conditionally during data loading.
- **Result**: Immediate visual feedback during data fetch.
No layout jump when the table data loads
-**Files Updated**: `src/components/common/TableSkeleton.tsx`
`src/components/common/index.ts`
`src/components/index.ts`
`src/pages/UsersPage/UsersPage.tsx`

---

#### 1. Optimistic UI for Status Toggle
- **Issue**:User status updates were reflected in the UI only after the API response, resulting in a noticeable delay.
- **Cause**: The UI relied entirely on query invalidation and refetching after the mutation completed.
- **Fix**: Implemented optimistic updates using React Query’s onMutate, onError, and onSettled callbacks to update the cache immediately and rollback on failure.
- **Result**: Status updates instantly on user interaction.
Automatic rollback if the API request fails.
-**Files Updated**: `src/hooks/useUsers.ts`