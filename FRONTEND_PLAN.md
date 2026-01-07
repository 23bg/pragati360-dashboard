# Pragati360 Frontend - Immutable Plan & Scope

This document defines the locked-down scope for hardening the Pragati360 merchant dashboard. It is the single source of truth for all frontend work. No features or architectural changes outside this plan are permitted.

## 1. Core Principles (Non-Negotiable)

- **Backend is the Single Source of Truth:** The frontend will not invent, assume, or cache state that conflicts with the backend. All data and errors are rendered as received.
- **Deterministic UI:** Given the same backend response, the UI will always render the same result. There is no optimistic rendering.
- **Strict Type Safety:** All usage of `any` or disabled type-checking rules will be eliminated.
- **Visible Failures:** All backend-reported errors must be clearly visible to the user in the context of the failed operation.
- **No Client-Side Enforcement:** The frontend will not implement any logic related to user plans, permissions, or usage limits.

## 2. Information Architecture (Locked)

The frontend will only implement the following dashboard sections. No new sections will be added.

- **Overview**
- **Business**
  - Merchant Profile
  - Outlets
  - Integrations
- **Posts**
  - Drafts
  - Scheduled
  - Published
  - Failed
- **Alerts**
- **Subscriptions**
- **Activity & Logs**
- **Support**
  - Tickets
- **Account**
  - Profile
  - Security
  - Devices

## 3. Technical Execution Strategy

### 3.1. Architecture & State Management
- **Global API Types:** Implement shared `ApiResponse<T>` and `AppError` types to be used for all backend communication.
- **RTK Slice Alignment:** All RTK slices will be audited and refactored to conform to the backend contract.
- **Required Slices:** Ensure the following slices exist and are correctly typed: `auth`, `user`, `merchant`, `plan`, `usage`, `alerts`, `systemHealth`.
- **API Service Layer:** Centralize all API calls within RTK thunks or a similar structured service layer. Remove all standalone `axios` calls from components.

### 3.2. Authentication & Security
- **Cookie-Based Sessions:** Refactor authentication to rely on `httpOnly` cookies managed by the backend. Remove token storage from `localStorage`.
- **Token Refresh:** Implement a robust and fully-typed `axios` interceptor to handle session renewal without race conditions.

### 3.3. UI & Component Hardening
- **Complete All Flows:** Implement the UI for all features listed in the Information Architecture.
- **Error State Rendering:** Ensure every data-driven component has a clear, visible state for loading, empty data, and backend-reported errors.

## 4. Non-Goals (Forbidden)

- Redesigning any part of the user interface.
- Adding new features, including AI, teams, roles, or analytics.
- Introducing feature flags or A/B testing capabilities.
- Adding tests of any kind (unit, integration, e2e).
- Changing or assuming any backend behavior.
- "Improving" the UI/UX with unrequested changes.