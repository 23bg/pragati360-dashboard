# Pragati360 Frontend - Atomic Task List

This file lists the exact, ordered tasks required to harden the dashboard. Each task must be completed and verified before proceeding to the next.

## Phase 1: Architecture & Type-Safety Foundation

-   **[Completed]** **Task 1.1 (Setup):** Create a central type definition file `src/shared/types/api.ts` for `ApiResponse<T>` and `AppError`.
-   **[Completed]** **Task 1.2 (Setup):** Remove `prisma` and `@prisma/client` from `package.json`.
-   **[Completed]** **Task 1.3 (Refactor):** Create a typed `apiService` or `rtkQuery-style` base query that wraps `axios` and uses the shared API types.
-   **[Completed]** **Task 1.4 (Refactor):** Refactor the `axios` interceptor for token refresh. It must be fully typed and use Next.js routing for redirects.

## Phase 2: RTK Slice Hardening

-   **[Completed]** **Task 2.1 (Refactor `auth` Slice):**
    -   Remove `localStorage` logic.
    -   Remove default error messages.
    -   Ensure all payloads and responses are strictly typed.
-   **[Completed]** **Task 2.2 (Refactor `user` Slice & Types):**
    -   Remove `[key: string]: any;` from `User` type. Define `googleOAuthTokens` and `instagramOAuthTokens` with `Record<string, unknown>`.
    -   Remove all `any` types from the slice logic.
-   **[Completed]** **Task 2.3 (Refactor `business` Slice):**
    -   Rename to `merchant` slice for clarity if it represents the merchant.
    -   Strictly type all thunk arguments.
-   **[Completed]** **Task 2.4 (Create Missing Slices):**
    -   Create placeholder slices for `plan`, `usage`, `alerts`, and `systemHealth` with correct initial state and types.

## Phase 3: Hook & Component Hardening

-   **[Completed]** **Task 3.1 (Refactor `useBusiness` Hook):** Rename to `useMerchant` and enforce strict types for all method arguments.
-   **[Completed]** **Task 3.2 (Refactor Common Components):**
    -   Fix `any` props in `ColumnVisibilityDropdown`, `FilterInput`, and `common-table-component`.
-   **[Completed]** **Task 3.3 (Refactor Feature Components):**
    -   Fix `any` usage in `UpdateUserForm`, `AccountPage`, `InstagramPostsView`.
-   **[Completed]** **Task 3.4 (Implement `UpdateUserForm`):** Complete the missing API call logic in the form.

## Phase 4: Final Polish & Verification

-   **[Completed]** **Task 4.1 (Remove All `eslint-disable`):**
    -   Perform a global search for `@typescript-eslint/no-explicit-any` and other disabled type-checking rules.
    -   Fix the underlying type error for each disabled line.
-   **[Completed]** **Task 4.2 (Dashboard Page Completion):**
    -   Verify every page in the dashboard handles loading, error, and empty states correctly.
    -   Implement UI for `Overview`, `Alerts`, `Activity & Logs`, and missing `Account` sections.

## Phase 5: Documentation & Final Review

-   **[Pending]** **Task 5.1 (Final Review):** Read through the entire codebase one last time to ensure all principles from `FRONTEND_PLAN.md` have been met.
-   **[Pending]** **Task 5.2 (Update Status):** Mark all tasks in `FRONTEND_STATUS.md` as complete.