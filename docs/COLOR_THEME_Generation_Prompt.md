Create a `COLOR_THEME.md` file for my **CampusFlow – University Management System**.

I want you to design the color system based on your own professional UI/UX judgment.

## Brand Colors

These four colors are fixed and must remain the foundation of the design:

```text
Primary      #1E3A8A
Primary Dark #152A63
Accent       #F59E0B
Neutral      #E2E8F0
```

The application supports both **Light Mode and Dark Mode**.

Do not replace these colors. You may introduce additional supporting colors only when they are necessary for readability, accessibility, status indication, or proper Light/Dark Mode implementation.

---

## What I want in COLOR_THEME.md

### 1. Color Philosophy

Explain how these four colors should work together in a professional University Management System.

The visual identity should feel:

- Professional
- Academic
- Trustworthy
- Modern
- Clean
- Enterprise/SaaS-like

Blue should remain the dominant visual identity.

Amber should be used carefully as an accent and should not dominate the interface.

---

### 2. Define the Role of Each Brand Color

Clearly explain where each color should be used.

#### Primary — `#1E3A8A`

Recommend its usage for things such as:

- Primary buttons
- Active navigation
- Links
- Selected tabs
- Important interactive elements
- Brand elements
- Focus states where appropriate

#### Primary Dark — `#152A63`

Recommend its usage for:

- Sidebar
- Navbar
- Header
- Dark brand surfaces
- Strong navigation areas
- Hover/pressed states where appropriate

Also explain where this color should NOT be used, especially in Dark Mode.

#### Accent — `#F59E0B`

Recommend its usage for:

- Highlights
- Important indicators
- Featured information
- Special statistics
- Attention elements
- Small visual accents
- Selected/highlighted UI elements

Make it clear that Accent is NOT the default button color.

#### Neutral — `#E2E8F0`

Recommend its usage for:

- Borders
- Dividers
- Table separators
- Input borders
- Card outlines
- Subtle UI surfaces
- Secondary visual structure

---

### 3. Light Mode Color System

Design a complete Light Mode semantic palette around the four brand colors.

Define appropriate values for:

```text
background
foreground
card
card-foreground
popover
popover-foreground
primary
primary-foreground
primary-dark
secondary
secondary-foreground
accent
accent-foreground
muted
muted-foreground
border
input
ring
```

The interface should primarily use light neutral backgrounds and white surfaces.

Avoid excessive use of colored backgrounds.

---

### 4. Dark Mode Color System

Design a proper Dark Mode rather than simply inverting the Light Mode.

Use deep navy/slate surfaces.

Define appropriate values for:

```text
background
foreground
card
card-foreground
popover
popover-foreground
primary
primary-foreground
primary-dark
secondary
secondary-foreground
accent
accent-foreground
muted
muted-foreground
border
input
ring
```

Pay particular attention to the contrast of:

- Text
- Buttons
- Borders
- Inputs
- Active navigation
- Accent elements

Do not blindly use `#152A63` as a large Dark Mode background if it causes poor contrast.

---

### 5. Recommended UI Distribution

Give a practical recommendation for approximately how much of the interface should visually consist of:

- Neutral colors
- Primary colors
- Primary Dark
- Accent
- Status colors

The goal should be a clean interface where the brand colors provide hierarchy rather than overwhelming the screen.

---

### 6. Component Usage

Create a clear table showing recommended colors for:

- Sidebar
- Navbar
- Header
- Page background
- Cards
- Primary button
- Secondary button
- Ghost button
- Links
- Tabs
- Inputs
- Forms
- Tables
- Modals
- Dropdowns
- Pagination
- Tooltips
- Badges
- Breadcrumbs
- Empty states
- Loading states

Include Light Mode and Dark Mode recommendations.

---

### 7. Button System

Define the color system for:

#### Primary Button
Use the main brand blue.

#### Secondary Button
Use a neutral/secondary treatment.

#### Accent Button
Use amber only when an action genuinely needs attention or emphasis.

#### Ghost Button
Keep it subtle.

#### Destructive Button
Use a proper destructive color.

Include:

- Default
- Hover
- Active
- Focus
- Disabled

---

### 8. Status Colors

Create a separate semantic status system.

Define appropriate colors for:

```text
Success
Warning
Destructive
Info
Muted
```

Then map common CampusFlow statuses:

```text
DRAFT
PENDING
SUBMITTED
PARTIALLY_PAID
APPROVED
PUBLISHED
SUCCESS
PAID
ACTIVE
REJECTED
FAILED
CANCELLED
OVERDUE
SUSPENDED
```

Important:

Do not use the brand Accent color as a replacement for every warning/status color.

Keep:

```text
Brand Accent
```

and

```text
System Warning
```

conceptually separate.

---

### 9. Role-Based UI

CampusFlow has:

```text
SUPER_ADMIN
ADMIN
DEPARTMENT_HEAD
INSTRUCTOR
STUDENT
ACCOUNTANT
```

Do not create six completely different themes.

The entire application must maintain the same CampusFlow brand identity.

If role-specific colors are useful, recommend subtle colors only for:

- Role badges
- Small indicators
- Profile labels
- Minor visual identification

Do not use role colors as large page backgrounds.

---

### 10. Dashboard Design

Recommend how the palette should be used in dashboard components such as:

- KPI cards
- Student statistics
- Instructor statistics
- Course statistics
- Revenue
- Payment statistics
- Enrollment statistics
- Charts
- Progress indicators

Avoid making every card a different bright color.

Prefer:

```text
Neutral card
+
small colored indicator
+
clear typography
```

---

### 11. Finance Module

Recommend colors for:

```text
Paid
Unpaid
Partially Paid
Overdue
Payment Success
Payment Failed
Refund
Revenue
Invoice
Transaction
```

Use semantic status colors where appropriate.

Do not make the entire Finance module amber just because amber is the brand accent.

---

### 12. Academic Module

Recommend a consistent color strategy for:

```text
Faculty
Department
Program
Course
Subject
Instructor
Student
Published
Draft
Active
Inactive
```

Keep these within the overall CampusFlow visual system.

---

### 13. Accessibility

Include practical accessibility guidance.

Pay particular attention to:

- Text contrast
- Button contrast
- Dark Mode readability
- Focus indicators
- Input borders
- Status badges
- Amber text
- Disabled states

Do not rely only on color to communicate meaning.

For example:

```text
PAID
✓ PAID

OVERDUE
! OVERDUE
```

should remain understandable even without color.

---

### 14. CSS Variable Recommendation

At the end of the document, provide a clean semantic CSS variable structure suitable for a modern React/Next.js + Tailwind + shadcn/ui application.

Use semantic names rather than hard-coding colors inside components.

For example:

```css
:root {
  --primary: ...;
  --primary-dark: ...;
  --accent: ...;
  --background: ...;
  --foreground: ...;
  --card: ...;
  --muted: ...;
  --border: ...;
  --success: ...;
  --warning: ...;
  --destructive: ...;
  --info: ...;
}

.dark {
  ...
}
```

The exact supporting colors should be selected based on professional UI/UX judgment.

---

### 15. Developer Rules

Create a short set of rules that developers can follow when adding new components.

For example:

- Prefer semantic variables over hex values.
- Do not introduce random colors.
- Do not use Accent everywhere.
- Keep Primary as the main brand identity.
- Use Primary Dark mainly for strong/dark surfaces.
- Use Neutral for structural UI elements.
- Use semantic status colors for system states.
- Always consider Light and Dark Mode together.
- Keep visual hierarchy consistent across all modules.

---

### Final Goal

The final `COLOR_THEME.md` should act as the **single source of truth for CampusFlow's color system**.

A developer should be able to open this file and immediately understand:

1. Which color to use
2. Where to use it
3. Which color to avoid
4. How the color behaves in Light Mode
5. How it behaves in Dark Mode
6. How to use it in components
7. How to maintain consistency across the entire application

Keep the documentation practical and developer-friendly.

Do not overcomplicate the color system.

The final design should look like a **modern, premium University Management SaaS**, not a colorful student dashboard.