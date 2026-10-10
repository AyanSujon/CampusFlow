# CampusFlow — University Management System

**A modern, role-based university management platform for academic administration, student and instructor management, and financial workflows.**

CampusFlow is a full-stack University Management System (UMS) designed to centralize university operations through a structured, secure, and user-friendly interface. The frontend provides role-oriented dashboards and administrative workflows, while the backend manages business logic, authentication, authorization, and persistent data.

Built with **Next.js, React, TypeScript, Tailwind CSS, and TanStack Query**, the application focuses on maintainability, responsive design, reusable components, and reliable API integration.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Links](#project-links)
- [Key Features](#key-features)
- [User Roles and Access](#user-roles-and-access)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Application Modules](#application-modules)
- [API Integration](#api-integration)
- [Authentication and Security](#authentication-and-security)
- [UI and Design System](#ui-and-design-system)
- [Code Quality and Best Practices](#code-quality-and-best-practices)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Related Repository](#related-repository)
- [Author](#author)
- [License](#license)

---

## Project Overview

Universities manage multiple interconnected processes, including student enrollment, instructor records, academic departments, educational programs, payments, and administrative permissions. Managing these processes independently can create fragmented information and inefficient workflows.

CampusFlow provides a centralized interface for managing these operations through role-based dashboards and dedicated application modules.

### Business Problems Solved

| Problem | CampusFlow Solution |
|---|---|
| Fragmented university administration | Centralizes core administrative operations in one application. |
| Disorganized academic records | Provides dedicated interfaces for students, instructors, faculties, departments, and programs. |
| Unauthorized access to sensitive operations | Organizes application access around role-based permissions. |
| Complex financial workflows | Provides a foundation for payment, invoice, and financial management operations. |

### Project Objectives

- Build a maintainable university management interface.
- Provide responsive dashboards for different university roles.
- Integrate frontend workflows with a dedicated REST API.
- Implement consistent form validation and API error handling.
- Reuse UI components and shared application logic.
- Support scalable development through TypeScript and modular architecture.

---

## Project Links

| Resource | Link |
|---|---|
| Backend Repository | [CampusFlow-API](https://github.com/AyanSujon/CampusFlow-API) |
| Backend Documentation | [Read the API Documentation](https://github.com/AyanSujon/CampusFlow-API/blob/main/README.md) |
| Frontend Repository | Add your frontend repository URL here |
| Live Application | Add your production URL here |

> The frontend and backend are maintained as separate repositories. Refer to the backend documentation for API-specific setup, database configuration, and backend development instructions.

---

## Key Features

### 1. Authentication and Account Management

- User authentication and session management.
- Google OAuth integration support.
- Email verification and OTP-based registration workflows where enabled.
- Protected application routes.
- Current-user information and profile access.
- Role-aware navigation and dashboard experiences.
- Logout and authentication state management.

### 2. University Administration

Dedicated interfaces for managing university users and academic structures.

- User management.
- Student management.
- Instructor management.
- Faculty management.
- Department management.
- Academic program management.
- Search, pagination, and filtering where supported.
- Record creation, viewing, updating, and status management according to permissions.

### 3. Student Management

- Student profile and academic information.
- Student identification and program association.
- Academic status management.
- Semester-related information.
- Student directory with search and pagination.

### 4. Instructor Management

- Instructor profile and professional information.
- Employee identification.
- Designation, qualification, and specialization.
- Employment and verification status.
- Instructor directory and profile management.

### 5. Academic Structure Management

- Faculty administration.
- Department administration.
- Program creation and management.
- Degree type and program duration.
- Credit requirements.
- Department and faculty relationships.
- Active and inactive record management.

### 6. Financial Workflows

The frontend architecture supports financial management interfaces, including:

- Student payment workflows.
- Invoice management.
- Payment status presentation.
- Accountant-oriented dashboard functionality.
- Integration points for supported payment providers, including Stripe and SSLCommerz.

Actual payment availability depends on the backend configuration, provider credentials, and completed integration.

### 7. Dashboard and Data Visualization

- Role-specific dashboards.
- Summary cards and key metrics.
- Tables for administrative records.
- Charts and data visualization using Recharts where implemented.
- Loading, empty, and error states for data-driven views.

### 8. Responsive User Interface

- Mobile-friendly layouts.
- Responsive tables and forms.
- Reusable dialogs and dropdowns.
- Consistent spacing and component styling.
- Light and dark theme support.
- Accessible interaction patterns where implemented.

---

## User Roles and Access

CampusFlow uses role-based authorization to organize administrative responsibilities.

| Role | Primary Responsibilities |
|---|---|
| `SUPER_ADMIN` | Platform-level administration and user management. |
| `ADMIN` | University administration and management of authorized resources. |
| `DEPARTMENT_HEAD` | Department-level academic and administrative operations. |
| `INSTRUCTOR` | Instructor-specific academic functionality. |
| `STUDENT` | Student-specific information and available academic or financial workflows. |
| `ACCOUNTANT` | Authorized financial operations, invoices, and payment-related workflows. |

The exact permissions for each role are enforced by the backend authorization layer. Frontend route protection and conditional UI rendering improve the user experience but must not be treated as substitutes for server-side authorization.

---

## Technology Stack

### Core Framework and Language

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | Application framework, routing, and production builds. |
| [React 19](https://react.dev/) | Component-based user interface development. |
| [TypeScript](https://www.typescriptlang.org/) | Static typing and maintainable application code. |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling and responsive layouts. |

### Data Fetching and Forms

| Technology | Purpose |
|---|---|
| [TanStack Query](https://tanstack.com/query/latest) | Server-state management, caching, and query lifecycle management. |
| [TanStack React Form](https://tanstack.com/form/latest) | Form state and submission management. |
| [Zod](https://zod.dev/) | Runtime data validation and schema definitions. |
| [ofetch](https://github.com/unjs/ofetch) | HTTP requests to backend APIs. |

### UI Components and Visualization

| Technology | Purpose |
|---|---|
| [shadcn/ui](https://ui.shadcn.com/) | UI component development and project component tooling. |
| [Base UI](https://base-ui.com/) | Accessible, unstyled interactive primitives. |
| [Lucide React](https://lucide.dev/) | Consistent interface icons. |
| [React Icons](https://react-icons.github.io/react-icons/) | Additional icon libraries. |
| [Recharts](https://recharts.org/) | Data visualization and dashboard charts. |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme preference management. |
| [class-variance-authority](https://cva.style/docs) | Variant-driven component styling. |
| [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) | CSS animation utilities. |
| [input-otp](https://github.com/guilhermerodz/input-otp) | OTP input interfaces. |

### Authentication Integration

| Technology | Purpose |
|---|---|
| [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) | Google OAuth client integration. |

### Development and Code Quality

| Technology | Purpose |
|---|---|
| [Biome](https://biomejs.dev/) | Linting, formatting, and code-quality checks. |
| [TypeScript](https://www.typescriptlang.org/) | Type checking during development and builds. |
| [React Compiler](https://react.dev/learn/react-compiler) | Compiler tooling configured through the project dependencies. |

---

## Application Architecture

The frontend communicates with the CampusFlow backend through HTTP API requests. TanStack Query manages server state, React components present the data, and TanStack Form with Zod supports form handling and validation.

```text
┌──────────────────────────────────────────┐
│              CampusFlow UI               │
│                                          │
│  Next.js App Router + React + TypeScript │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│           Presentation Layer             │
│                                          │
│  Pages • Layouts • Dashboards • Forms    │
│  Tables • Dialogs • Reusable Components  │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│           Frontend Data Layer            │
│                                          │
│  TanStack Query • ofetch • API Services  │
│  Type Definitions • Validation Schemas   │
└────────────────────┬─────────────────────┘
                     │
                     │ HTTP / REST API
                     ▼
┌──────────────────────────────────────────┐
│             CampusFlow API               │
│                                          │
│  Authentication • Authorization          │
│  Business Logic • Validation             │
│  Prisma • PostgreSQL                     │
└──────────────────────────────────────────┘
```

### Architectural Principles

- **Separation of concerns:** Keep presentation, API communication, validation, and business-specific logic organized.
- **Reusable components:** Share common tables, forms, dialogs, buttons, and layout components.
- **Typed API contracts:** Define TypeScript types for API requests and responses.
- **Centralized data fetching:** Reuse query keys and query functions for consistent caching and invalidation.
- **Consistent error handling:** Present meaningful feedback for failed requests and invalid form submissions.
- **Permission-aware interfaces:** Show actions and navigation appropriate to the signed-in user's role.

---

## Getting Started

### Prerequisites

Install the following tools before running the application:

- [Node.js](https://nodejs.org/) — use a version compatible with Next.js 16.
- npm, included with Node.js.
- Git.
- A running CampusFlow backend API or an appropriately configured remote API endpoint.

Check your installed versions:

```bash
node --version
npm --version
git --version
```

### 1. Clone the Repository

Replace the example repository URL with the actual frontend repository URL.

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
cd campusflow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

These are example variable names. Confirm the actual names and expected API base URL against the existing frontend configuration before using them.

If the backend runs on a different port or uses a different API prefix, update the URL accordingly. For production, configure the URL of the deployed backend.

### 4. Start the Development Server

```bash
npm run dev
```

Open the application at:

**http://localhost:3000**

The frontend requires a reachable backend for features that depend on API data, authentication, and protected operations.

### 5. Run the Production Build

```bash
npm run build
```

### 6. Start the Production Server Locally

After a successful build:

```bash
npm run start
```

The production server runs on port `3000` by default unless configured otherwise.

---

## Environment Variables

The following table describes example configuration values. Your implementation may use different names depending on the API client and authentication setup.

| Variable | Example | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api/v1` | Backend API base URL, if referenced by the application. |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `your-client-id` | Google OAuth client ID, if this name is used by the OAuth configuration. |

### Environment Configuration Guidelines

1. Use `.env.local` for local development.
2. Configure production environment variables in your hosting provider.
3. Never commit `.env.local` or actual credentials to Git.
4. Only expose values through `NEXT_PUBLIC_` when they are safe for browser access.
5. Never expose private API keys, database credentials, OAuth client secrets, or payment-provider secrets through public frontend variables.
6. Restart the development server after modifying environment variables.

**Important:** Public frontend variables are embedded in client-side application output when referenced by client code. They must never contain secrets.

---

## Available Scripts

The following commands are defined in the project's `package.json`.

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Starts the production server after building. |
| `npm run lint` | Runs Biome checks against the project. |
| `npm run format` | Formats supported files using Biome. |

### Code Quality Checks

Run the configured checks before submitting changes:

```bash
npm run lint
npm run build
```

Format files when needed:

```bash
npm run format
```

The current `format` script uses `--write`, so it modifies files in place. Run it intentionally and review the resulting changes before committing.

---

## Application Modules

The frontend is organized around the main university management workflows.

| Module | Purpose |
|---|---|
| Authentication | Login, registration, verification, and session-related interfaces. |
| Dashboard | Role-oriented summaries and navigation. |
| Users | Authorized user administration and account status management. |
| Students | Student profiles, academic status, and directory management. |
| Instructors | Instructor profiles, employment information, and verification status. |
| Faculties | Faculty records and administrative assignments. |
| Departments | Department records and relationships to faculties. |
| Programs | Academic programs, degree types, duration, and credit requirements. |
| Finance | Payment-related interfaces, invoices, and accountant workflows. |
| Settings | User-accessible preferences and notification settings where implemented. |

The exact routes depend on the application's current App Router structure and the permissions assigned to each role.

---

## API Integration

CampusFlow uses a separate backend API to handle application data and business operations.

**Backend repository:** [AyanSujon/CampusFlow-API](https://github.com/AyanSujon/CampusFlow-API)

The frontend API layer should be responsible for:

- Building requests against the configured API base URL.
- Sending the appropriate HTTP method and request payload.
- Handling authentication credentials according to the backend's session mechanism.
- Parsing successful responses.
- Handling HTTP errors and backend validation messages.
- Providing typed data to React components.
- Invalidating or refreshing relevant queries after mutations.

### Recommended Data-Fetching Pattern

For a typical data-driven page:

1. Define a query function in the appropriate API service.
2. Call it through a reusable TanStack Query hook.
3. Render loading, success, empty, and error states.
4. Use mutations for create, update, and delete operations.
5. Invalidate the relevant query keys after successful mutations.

Example pattern:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";

type Program = {
  id: string;
  code: string;
  name: string;
  degreeType: string;
};

async function getPrograms(): Promise<Program[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/programs/all`,
    {
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve programs.");
  }

  const result = await response.json();

  return result.data;
}

export function useGetPrograms() {
  return useQuery({
    queryKey: ["programs"],
    queryFn: getPrograms,
  });
}
```

> This snippet illustrates the pattern only. Adapt the endpoint, response structure, authentication mechanism, and request options to the actual CampusFlow API contract. Reuse the existing API client and hooks if the project already provides them instead of duplicating this implementation.

### API Documentation

For backend endpoints, supported request payloads, response formats, and authorization requirements, consult the [CampusFlow-API README](https://github.com/AyanSujon/CampusFlow-API/blob/main/README.md).

---

## Authentication and Security

CampusFlow's frontend must work together with backend authentication and authorization mechanisms.

### Security Considerations

- Keep protected API operations enforced on the backend.
- Do not rely on hidden buttons or frontend route guards as security controls.
- Avoid storing sensitive authentication credentials in browser-accessible storage.
- Use secure, HTTP-only cookies when supported by the backend's authentication design.
- Configure HTTPS for production.
- Validate form inputs on the frontend and independently on the backend.
- Handle expired sessions and unauthorized API responses consistently.
- Restrict cross-origin requests through appropriate backend CORS configuration.
- Keep production secrets in environment variables managed by the deployment platform.
- Avoid logging passwords, access tokens, session identifiers, or sensitive student information.

### Google OAuth

Google OAuth client integration is included in the frontend dependency stack. Successful authentication depends on correct provider configuration, authorized origins, and the corresponding backend authentication flow.

### Payment Security

Payment authorization, payment verification, transaction status, and financial records must be validated by the backend. The frontend must not independently determine that a payment has succeeded based solely on a client-side redirect or UI state.

---

## UI and Design System

CampusFlow uses a reusable component-oriented interface built with Tailwind CSS, Base UI, shadcn tooling, and supporting icon and animation libraries.

### Design Principles

- Maintain consistent typography, spacing, and component dimensions.
- Prefer shared theme tokens over scattered hard-coded colors.
- Support light and dark themes where applicable.
- Keep dashboard layouts responsive across desktop, tablet, and mobile devices.
- Provide accessible labels and keyboard interactions.
- Use consistent visual states for loading, errors, success, and disabled actions.
- Keep forms, dialogs, tables, and pagination components reusable.

### Component Guidelines

| Component Category | Responsibility |
|---|---|
| Layout | Application shells, sidebars, navigation, and headers. |
| Forms | Inputs, validation messages, submit actions, and form state. |
| Data tables | Record display, sorting, filtering, and pagination. |
| Dialogs | Record creation, editing, confirmation, and detailed views. |
| Feedback | Notifications, alerts, empty states, and loading indicators. |
| Theme | Shared colors, dark mode, and appearance preferences. |

Prefer existing shared components over implementing separate versions of the same interface pattern for every module.

---

## Code Quality and Best Practices

### TypeScript

- Avoid unnecessary use of `any`.
- Define explicit types for API payloads and responses.
- Reuse shared interfaces and enums where appropriate.
- Use schema validation for untrusted form and API data.
- Handle nullable fields explicitly.

### React and Next.js

- Use Server Components by default where suitable.
- Add `"use client"` only to components that require client-side state, event handlers, or client-only hooks.
- Keep interactive components focused and reusable.
- Use stable keys when rendering lists.
- Handle asynchronous requests and errors consistently.
- Avoid unnecessary client-side state when server state can be managed by TanStack Query.

### TanStack Query

- Use consistent query-key conventions.
- Avoid duplicate API calls caused by inconsistent query configuration.
- Invalidate relevant queries after successful mutations.
- Configure retry behavior appropriately for authentication and other non-retryable errors.
- Handle loading and error states instead of assuming every request succeeds.

### Forms and Validation

- Use TanStack Form for complex form state and submission workflows where appropriate.
- Use Zod for schema-based validation.
- Display clear field-level validation messages.
- Prevent duplicate submissions while a request is pending.
- Keep frontend validation aligned with backend rules.

### Git Workflow

Use descriptive branch names and commit messages.

Example branch names:

```text
feature/student-management
feature/program-management
fix/authentication-error
fix/responsive-dashboard
```

Example commit messages:

```text
feat: add program management page
fix: handle API validation errors
refactor: reuse pagination component
style: improve responsive dashboard layout
```

---

## Production Build

Before deploying a new version, verify that the project builds successfully.

### 1. Install Dependencies

```bash
npm ci
```

Use `npm ci` when a compatible `package-lock.json` is committed and you want a reproducible installation.

### 2. Run Code Checks

```bash
npm run lint
```

### 3. Create the Production Build

```bash
npm run build
```

### 4. Test the Production Server

```bash
npm run start
```

Verify the following:

- Public pages load successfully.
- Authentication works against the intended backend.
- Protected routes enforce the expected user experience.
- API requests use the correct production URL.
- Forms display validation errors correctly.
- Tables, filters, and pagination behave as expected.
- Responsive layouts work across supported screen sizes.
- Theme preferences behave correctly.
- Financial workflows display the status returned by the backend.

A successful build is an important check, but it does not replace functional, security, and integration testing.

---

## Deployment

The application can be deployed to a hosting platform that supports Next.js.

### Example: Deploying to Vercel

1. Push the frontend repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/).
3. Import the frontend repository.
4. Configure the project's environment variables.
5. Set the production API URL to the deployed CampusFlow backend.
6. Configure Google OAuth authorized origins if Google authentication is enabled.
7. Deploy the application.
8. Test authentication, API connectivity, protected workflows, and production builds.

### Production Configuration Checklist

- [ ] Production API URL configured.
- [ ] Required public environment variables configured.
- [ ] Backend CORS allows the production frontend origin.
- [ ] HTTPS enabled.
- [ ] Google OAuth origins configured where applicable.
- [ ] Authentication and session handling verified.
- [ ] No private credentials committed to the repository.
- [ ] Production build succeeds.
- [ ] Critical workflows tested against the deployed API.

The production URL and hosting configuration should be added to this README after deployment has been verified.

---

## Troubleshooting

### PowerShell Blocks npm Scripts

If PowerShell reports that `npm.ps1` cannot run because script execution is disabled, use the Windows command wrapper:

```powershell
npm.cmd run dev
```

You can also run the command in Command Prompt or Git Bash.

### Backend API Requests Fail

Check that:

1. The backend server is running.
2. The configured API base URL is correct.
3. The endpoint and API prefix match the backend implementation.
4. CORS allows the frontend origin.
5. Authentication cookies or other required credentials are sent correctly.
6. The backend logs do not report request validation or server errors.

### Google OAuth Does Not Work

Verify the OAuth client ID, authorized JavaScript origins, provider configuration, and backend authentication flow.

Never expose a Google OAuth client secret in browser-side code.

### Production Build Fails

Run:

```bash
npm run build
```

Review the first meaningful error in the terminal. Common causes include TypeScript errors, incorrect imports, invalid component props, missing environment configuration, and server/client component boundary issues.

### Changes to Environment Variables Are Not Applied

Restart the development server after changing `.env.local`. For production deployments, update the hosting provider's environment settings and redeploy when required.

---

## Future Improvements

Potential improvements for the project include:

- Expanded automated testing for critical user workflows.
- Stronger end-to-end testing of authentication and authorization.
- Improved dashboard analytics and reporting.
- More comprehensive accessibility testing.
- Standardized API error handling and notification patterns.
- Enhanced loading and empty states across all modules.
- Improved application performance monitoring.
- Automated linting, type checking, and build validation in CI/CD.
- Additional documentation for contributors and frontend architecture.

These are potential improvements, not claims that every item is currently implemented.

---

## Related Repository

### CampusFlow API

The frontend depends on the CampusFlow backend for authentication, authorization, data persistence, and business operations.

Repository: [github.com/AyanSujon/CampusFlow-API](https://github.com/AyanSujon/CampusFlow-API)

Consult its README for backend-specific setup, API configuration, database information, and supported functionality.

---

## Author

**Ayan Sujon**

Full-Stack Developer | Next.js, React, Node.js, TypeScript, PostgreSQL

- GitHub: [AyanSujon](https://github.com/AyanSujon)
- LinkedIn: [Ayan Sujon](https://www.linkedin.com/in/ayansujon/)
- Portfolio: [ayansujon.vercel.app](https://ayansujon.vercel.app/)

For project-related questions, feature suggestions, or collaboration opportunities, feel free to connect through GitHub or LinkedIn.

---

## License

No license has been specified in this documentation. Add an appropriate `LICENSE` file and update this section before distributing the project under an open-source license.

---

**CampusFlow — Bringing university administration into one connected platform.**
