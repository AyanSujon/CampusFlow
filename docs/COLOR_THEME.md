# CampusFlow — Color Theme

> **Single source of truth for the CampusFlow University Management System color system.**

CampusFlow uses a professional, academic, trustworthy, and modern visual language inspired by enterprise SaaS products.

The color system is built around four fixed brand colors:

| Token | Color | Purpose |
|---|---|---|
| **Primary** | `#1E3A8A` | Main brand identity and interactive elements |
| **Primary Dark** | `#152A63` | Strong navigation and dark brand surfaces |
| **Accent** | `#F59E0B` | Highlights and selective emphasis |
| **Neutral** | `#E2E8F0` | Structure, borders, separators, and subtle UI |

The system intentionally favors **blue + neutral surfaces**, while amber is used sparingly.

---

# 1. Color Philosophy

CampusFlow should feel like a **premium university administration platform**, not a colorful student-facing dashboard.

The visual language should communicate:

- Professionalism
- Academic credibility
- Trust
- Stability
- Modern SaaS quality
- Clean information hierarchy
- Enterprise-level usability

## Core Philosophy

### Blue = Trust + Identity

Blue is the dominant visual language.

`#1E3A8A` should immediately communicate that an element belongs to CampusFlow or is important to the application's interaction hierarchy.

### Dark Blue = Authority + Navigation

`#152A63` represents stronger structural areas such as:

- Sidebar
- Navbar
- Header
- Navigation
- Dark brand surfaces

It should be used intentionally rather than covering the entire application.

### Amber = Attention + Emphasis

`#F59E0B` should attract attention.

It is an **accent**, not the primary interaction color.

Use it for:

- Highlights
- Important indicators
- Featured statistics
- Special actions
- Small visual emphasis

Do **not** use amber for every button, card, badge, or warning.

### Neutral = Structure

`#E2E8F0` provides visual organization.

Use neutral tones extensively for:

- Borders
- Dividers
- Inputs
- Tables
- Card structure
- Secondary surfaces

---

# 2. Brand Color Roles

## Primary — `#1E3A8A`

### Recommended Usage

Use Primary for:

- Primary buttons
- Active navigation
- Links
- Selected tabs
- Selected menu items
- Important interactive controls
- Brand elements
- Pagination active states
- Progress indicators
- Focus rings where appropriate
- Important data visualization elements

### Example

```text
Primary Button
Active Sidebar Item
Selected Tab
Primary Link
Current Pagination Page
```

### Do Not Overuse

Avoid using Primary as:

- The background of every card
- The background of every section
- Large decorative areas
- Every badge
- Every chart
- Every statistic

Primary establishes hierarchy. It loses its meaning if everything is Primary.

---

# 3. Primary Dark — `#152A63`

Primary Dark is the strongest structural brand color.

### Recommended Usage

Use it for:

- Sidebar
- Navbar
- Header
- Strong navigation areas
- Dark brand surfaces
- Authentication layouts
- Selected navigation backgrounds
- Hover/pressed states when appropriate

### Example

```text
Sidebar
┌──────────────────────┐
│ CampusFlow           │
│ Dashboard            │
│ Students             │
│ Courses              │
│ Finance              │
└──────────────────────┘
```

### Dark Mode Warning

Do **not** automatically use:

```css
.dark {
  background: #152A63;
}
```

as the entire Dark Mode background.

`#152A63` should remain a **brand surface**, while the main Dark Mode background should use a deeper neutral/slate color.

This creates better hierarchy and reduces visual fatigue.

---

# 4. Accent — `#F59E0B`

Accent represents selective attention.

### Recommended Usage

Use Accent for:

- KPI highlights
- Featured metrics
- Important indicators
- Special statistics
- Small decorative elements
- Selected/highlighted information
- Attention indicators
- Progress milestones
- Premium/featured labels

### Important Rule

> **Accent is not the default button color.**

The default primary action should remain blue.

Use amber only when an action or information genuinely deserves additional visual emphasis.

### Good

```text
Revenue
$128,450
──────────
    ●
```

### Bad

```text
[ Create Student ]  ← Amber
[ Edit Student ]    ← Amber
[ Delete Student ]  ← Amber
[ Save ]            ← Amber
[ Cancel ]          ← Amber
```

---

# 5. Neutral — `#E2E8F0`

Neutral is primarily a structural color.

Use it for:

- Borders
- Dividers
- Table separators
- Input borders
- Card outlines
- Secondary UI structure
- Subtle backgrounds
- Skeleton/loading structure

Neutral should create separation without competing with content.

---

# 6. Light Mode Color System

Light Mode should use white and very-light slate surfaces.

| Semantic Token | Value | Purpose |
|---|---:|---|
| `background` | `#F8FAFC` | Main application background |
| `foreground` | `#0F172A` | Main text |
| `card` | `#FFFFFF` | Cards |
| `card-foreground` | `#0F172A` | Card text |
| `popover` | `#FFFFFF` | Dropdowns/modals |
| `popover-foreground` | `#0F172A` | Popover text |
| `primary` | `#1E3A8A` | Main brand/action |
| `primary-foreground` | `#FFFFFF` | Text on Primary |
| `primary-dark` | `#152A63` | Strong navigation surfaces |
| `secondary` | `#F1F5F9` | Secondary controls |
| `secondary-foreground` | `#1E293B` | Secondary text |
| `accent` | `#F59E0B` | Brand accent |
| `accent-foreground` | `#172033` | Text on Accent |
| `muted` | `#F1F5F9` | Muted surfaces |
| `muted-foreground` | `#64748B` | Secondary text |
| `border` | `#E2E8F0` | Borders |
| `input` | `#CBD5E1` | Input borders |
| `ring` | `#1E3A8A` | Focus indicator |

## Light Mode Principles

Prefer:

```text
#F8FAFC → Application background
#FFFFFF → Cards
#F1F5F9 → Secondary/muted surfaces
#E2E8F0 → Borders
#1E3A8A → Actions/identity
```

Avoid large areas of:

```text
#1E3A8A
#152A63
#F59E0B
```

unless the component intentionally requires a strong brand surface.

---

# 7. Dark Mode Color System

Dark Mode should not simply invert Light Mode.

Use deep slate/navy surfaces while keeping blue as the brand identity.

| Semantic Token | Value | Purpose |
|---|---:|---|
| `background` | `#0B1120` | Main application background |
| `foreground` | `#F8FAFC` | Main text |
| `card` | `#111827` | Cards |
| `card-foreground` | `#F8FAFC` | Card text |
| `popover` | `#172033` | Dropdowns/modals |
| `popover-foreground` | `#F8FAFC` | Popover text |
| `primary` | `#3B5CCC` | Accessible blue interaction color |
| `primary-foreground` | `#FFFFFF` | Text on Primary |
| `primary-dark` | `#152A63` | Brand/navigation surface |
| `secondary` | `#1E293B` | Secondary controls |
| `secondary-foreground` | `#E2E8F0` | Secondary text |
| `accent` | `#F59E0B` | Brand accent |
| `accent-foreground` | `#111827` | Text on Accent |
| `muted` | `#1E293B` | Muted surfaces |
| `muted-foreground` | `#94A3B8` | Secondary text |
| `border` | `#263449` | Dark borders |
| `input` | `#334155` | Input borders |
| `ring` | `#60A5FA` | Visible focus indicator |

## Important Dark Mode Decision

The original Primary color:

```text
#1E3A8A
```

remains the brand foundation.

However, Dark Mode may use a lighter supporting blue such as:

```text
#3B5CCC
```

for interactive controls when necessary for readability and contrast.

This does **not** replace the brand Primary.

It is an accessibility-oriented Dark Mode interaction shade.

---

# 8. Recommended UI Distribution

The application should visually follow approximately this distribution:

| Category | Recommended Visual Share |
|---|---:|
| Neutral / Slate / White | **70–80%** |
| Primary Blue | **10–15%** |
| Primary Dark | **5–10%** |
| Accent Amber | **2–5%** |
| Status Colors | **1–5%** |

These percentages are visual guidelines, not strict CSS rules.

## Golden Rule

> **Most of the screen should remain calm and neutral.**

Brand colors should establish hierarchy rather than dominate the interface.

---

# 9. Component Usage

| Component | Light Mode | Dark Mode |
|---|---|---|
| Sidebar | `primary-dark` | `primary-dark` / deep navy |
| Navbar | White / `primary-dark` | `#111827` / `primary-dark` |
| Header | White | `#111827` |
| Page Background | `#F8FAFC` | `#0B1120` |
| Cards | White | `#111827` |
| Primary Button | Primary | Dark-mode Primary |
| Secondary Button | `#F1F5F9` | `#1E293B` |
| Ghost Button | Transparent | Transparent |
| Links | Primary | `#60A5FA` |
| Tabs | Neutral + Primary active | Slate + Primary active |
| Inputs | White + Neutral border | `#111827` + Slate border |
| Forms | White cards | Dark cards |
| Tables | White / subtle slate | Dark cards / slate rows |
| Modals | White | `#172033` |
| Dropdowns | White | `#172033` |
| Pagination | Neutral + Primary active | Slate + Primary active |
| Tooltips | `#0F172A` | `#E2E8F0` |
| Badges | Semantic colors | Dark semantic variants |
| Breadcrumbs | Muted + Primary links | Muted + Blue links |
| Empty States | Neutral + subtle Primary | Dark neutral + subtle Primary |
| Loading States | Neutral skeleton | Dark slate skeleton |

---

# 10. Button System

## Primary Button

Primary buttons represent the most important action.

```text
Default  → Primary
Hover    → Primary Dark
Active   → Primary Dark
Focus    → Primary + Ring
Disabled → Muted + reduced opacity
```

Example:

```text
[ Save Student ]
[ Create Course ]
[ Submit Payment ]
[ Create Invoice ]
```

---

## Secondary Button

Secondary actions should not compete with Primary actions.

```text
Background → Secondary
Text       → Secondary Foreground
Border     → Border
Hover      → Slightly darker/lighter secondary surface
```

Examples:

```text
[ Cancel ]
[ Back ]
[ View Details ]
```

---

## Accent Button

Use Accent only when an action genuinely requires attention.

```text
Default → Accent
Hover   → Darker amber
Active  → Darker amber
Focus   → Accent + Ring
```

Good examples:

```text
[ Feature ]
[ Highlight ]
[ Upgrade ]
```

Do not make normal CRUD actions amber.

---

## Ghost Button

Ghost buttons should remain visually lightweight.

```text
Background → Transparent
Text       → Foreground / Primary
Hover      → Muted
Border     → Transparent
```

Examples:

```text
[ More ]
[ Filter ]
[ Close ]
```

---

## Destructive Button

Destructive actions use a dedicated semantic red.

```text
Default → #DC2626
Hover   → #B91C1C
Active  → #991B1B
Focus   → Red + Ring
Disabled → Muted
```

Examples:

```text
[ Delete ]
[ Remove ]
[ Permanently Delete ]
```

Never use Amber for destructive actions.

---

# 11. Status Colors

Brand colors and system status colors must remain conceptually separate.

## Semantic Status Palette

| Status | Color | Hex |
|---|---|---:|
| Success | Green | `#16A34A` |
| Warning | Amber/Orange | `#D97706` |
| Destructive | Red | `#DC2626` |
| Info | Blue | `#2563EB` |
| Muted | Slate | `#64748B` |

## Brand Accent vs System Warning

These are different concepts.

```text
Brand Accent
#F59E0B
```

means:

> "Pay attention to this branded/highlighted information."

System Warning means:

> "Something requires attention or has a potentially problematic state."

Therefore, do not automatically map every warning to the Brand Accent.

---

# 12. CampusFlow Status Mapping

| Status | Semantic Color | Suggested Icon |
|---|---|---|
| `DRAFT` | Muted | `○` |
| `PENDING` | Warning | `◷` |
| `SUBMITTED` | Info | `↑` |
| `PARTIALLY_PAID` | Warning | `◐` |
| `APPROVED` | Success | `✓` |
| `PUBLISHED` | Success | `✓` |
| `SUCCESS` | Success | `✓` |
| `PAID` | Success | `✓` |
| `ACTIVE` | Success | `●` |
| `REJECTED` | Destructive | `×` |
| `FAILED` | Destructive | `×` |
| `CANCELLED` | Muted / Destructive | `×` |
| `OVERDUE` | Destructive | `!` |
| `SUSPENDED` | Warning / Destructive | `!` |

## Example

Do not rely on:

```text
[ PAID ]
```

being green only.

Prefer:

```text
✓ PAID
```

And:

```text
! OVERDUE
```

This keeps the meaning understandable without color.

---

# 13. Role-Based UI

CampusFlow should **not** create six different visual themes.

All roles must share the same CampusFlow identity.

Roles:

```text
SUPER_ADMIN
ADMIN
DEPARTMENT_HEAD
INSTRUCTOR
STUDENT
ACCOUNTANT
```

Role colors should only be used for small identification elements.

## Recommended Role Colors

| Role | Suggested Color | Usage |
|---|---|---|
| SUPER_ADMIN | Primary Dark | Badge / profile |
| ADMIN | Primary | Badge / profile |
| DEPARTMENT_HEAD | Violet `#7C3AED` | Small indicator |
| INSTRUCTOR | Info Blue `#2563EB` | Small indicator |
| STUDENT | Teal `#0F766E` | Small indicator |
| ACCOUNTANT | Green `#15803D` | Small indicator |

### Allowed

```text
[ SUPER ADMIN ]
[ ACCOUNTANT ]
[ INSTRUCTOR ]
```

### Not Allowed

```text
Entire ADMIN dashboard = Purple
Entire STUDENT dashboard = Teal
Entire ACCOUNTANT dashboard = Green
```

Role colors should identify, not redesign the application.

---

# 14. Dashboard Design

CampusFlow dashboards should feel like enterprise analytics software.

## KPI Cards

Prefer:

```text
┌─────────────────────────────┐
│ Total Students          ●   │
│                             │
│ 12,840                      │
│ +8.4% this month            │
└─────────────────────────────┘
```

Use:

- Neutral/white card
- Strong typography
- Small colored indicator
- Small trend indicator
- Minimal decoration

## Avoid

```text
Blue Card
Green Card
Orange Card
Purple Card
Red Card
```

for every KPI.

This makes the dashboard look like a generic colorful admin template.

---

## Recommended KPI Strategy

| Metric | Card | Indicator |
|---|---|---|
| Students | Neutral | Primary |
| Instructors | Neutral | Info |
| Courses | Neutral | Primary |
| Revenue | Neutral | Success |
| Payments | Neutral | Success/Warning |
| Enrollment | Neutral | Primary |
| Pending Requests | Neutral | Warning |

---

# 15. Charts

Charts should use a restrained palette.

### Recommended hierarchy

```text
Primary Blue
Supporting Blue
Success Green
Warning Amber
Info Blue
Destructive Red
Neutral Slate
```

Do not use six unrelated bright colors simply to make charts colorful.

## Example

For revenue:

```text
Revenue
│
│       ╭──────
│    ╭──╯
│ ╭──╯
└────────────────
```

Primary blue should be the dominant series.

Amber may highlight a special period or threshold.

---

# 16. Finance Module

Finance must use **semantic financial status colors**, not brand colors everywhere.

## Payment Status

| Status | Color |
|---|---|
| Paid | Success |
| Unpaid | Muted / Warning |
| Partially Paid | Warning |
| Overdue | Destructive |
| Payment Success | Success |
| Payment Failed | Destructive |
| Refund | Info |
| Revenue | Primary |
| Invoice | Primary |
| Transaction | Neutral / Primary |

## Example

```text
Invoice #INV-2026-001

Amount       ৳50,000
Paid         ✓ ৳30,000
Remaining    ৳20,000

Status       ◐ PARTIALLY PAID
```

The entire invoice card should remain neutral.

Only the status and relevant indicators receive semantic color.

---

# 17. Academic Module

Academic entities should share the same visual hierarchy.

```text
Faculty
  ↓
Department
  ↓
Program
  ↓
Course
  ↓
Subject
```

## Recommended Strategy

| Entity | Visual Treatment |
|---|---|
| Faculty | Primary |
| Department | Primary / neutral |
| Program | Neutral |
| Course | Primary |
| Subject | Neutral |
| Instructor | Info |
| Student | Primary |
| Published | Success |
| Draft | Muted |
| Active | Success |
| Inactive | Muted |

Do not assign completely unrelated colors to every academic entity.

Hierarchy should primarily come from:

- Typography
- Spacing
- Layout
- Icons
- Borders
- Primary blue

rather than color variety.

---

# 18. Accessibility

Accessibility is part of the color system.

## Text Contrast

Normal text should have strong contrast against its background.

Prefer:

```text
#0F172A on #FFFFFF
#F8FAFC on #0B1120
```

Avoid low-contrast combinations such as:

```text
Light gray text on white
Dark gray text on dark gray
Amber text on white
```

---

## Amber Text

Do not use:

```css
color: #F59E0B;
```

for large amounts of normal text on a white background.

Amber is primarily an accent/background/icon color.

If amber text is required, use a darker warning shade such as:

```text
#B45309
```

where appropriate for contrast.

---

## Focus Indicators

Every keyboard-accessible interactive element must have a visible focus state.

Recommended:

```text
Light Mode → Primary / blue ring
Dark Mode  → #60A5FA ring
```

Do not remove focus outlines without replacing them with an equally visible indicator.

---

## Input Borders

Inputs should remain clearly distinguishable.

Light:

```text
Input → White
Border → #CBD5E1
Focus → Primary
```

Dark:

```text
Input → #111827
Border → #334155
Focus → #60A5FA
```

---

## Status Badges

Never communicate state exclusively through color.

Use:

```text
✓ PAID
! OVERDUE
× FAILED
◷ PENDING
● ACTIVE
```

instead of relying solely on:

```text
Green
Red
Yellow
Blue
```

---

## Disabled States

Disabled components should appear visually inactive but remain understandable.

Recommended:

```text
opacity: 0.5–0.6
cursor: not-allowed
```

Do not make disabled text so faint that it becomes unreadable.

---

# 19. CSS Variable Recommendation

CampusFlow should use semantic CSS variables.

Components should not contain random hard-coded hex values.

## Light Mode

```css
:root {
  /* =========================
     Brand
     ========================= */

  --primary: #1E3A8A;
  --primary-dark: #152A63;
  --accent: #F59E0B;
  --neutral: #E2E8F0;

  /* =========================
     Base
     ========================= */

  --background: #F8FAFC;
  --foreground: #0F172A;

  /* =========================
     Surfaces
     ========================= */

  --card: #FFFFFF;
  --card-foreground: #0F172A;

  --popover: #FFFFFF;
  --popover-foreground: #0F172A;

  /* =========================
     Interactive
     ========================= */

  --primary-foreground: #FFFFFF;

  --secondary: #F1F5F9;
  --secondary-foreground: #1E293B;

  --accent-foreground: #172033;

  /* =========================
     Muted
     ========================= */

  --muted: #F1F5F9;
  --muted-foreground: #64748B;

  /* =========================
     Structure
     ========================= */

  --border: #E2E8F0;
  --input: #CBD5E1;
  --ring: #1E3A8A;

  /* =========================
     Semantic Status
     ========================= */

  --success: #16A34A;
  --success-foreground: #FFFFFF;

  --warning: #D97706;
  --warning-foreground: #FFFFFF;

  --destructive: #DC2626;
  --destructive-foreground: #FFFFFF;

  --info: #2563EB;
  --info-foreground: #FFFFFF;

  --status-muted: #64748B;
  --status-muted-foreground: #FFFFFF;
}
```

---

# 20. Dark Mode CSS Variables

```css
.dark {
  /* =========================
     Brand
     ========================= */

  --primary: #3B5CCC;
  --primary-dark: #152A63;
  --accent: #F59E0B;
  --neutral: #E2E8F0;

  /* =========================
     Base
     ========================= */

  --background: #0B1120;
  --foreground: #F8FAFC;

  /* =========================
     Surfaces
     ========================= */

  --card: #111827;
  --card-foreground: #F8FAFC;

  --popover: #172033;
  --popover-foreground: #F8FAFC;

  /* =========================
     Interactive
     ========================= */

  --primary-foreground: #FFFFFF;

  --secondary: #1E293B;
  --secondary-foreground: #E2E8F0;

  --accent-foreground: #111827;

  /* =========================
     Muted
     ========================= */

  --muted: #1E293B;
  --muted-foreground: #94A3B8;

  /* =========================
     Structure
     ========================= */

  --border: #263449;
  --input: #334155;
  --ring: #60A5FA;

  /* =========================
     Semantic Status
     ========================= */

  --success: #22C55E;
  --success-foreground: #052E16;

  --warning: #F59E0B;
  --warning-foreground: #111827;

  --destructive: #EF4444;
  --destructive-foreground: #FFFFFF;

  --info: #3B82F6;
  --info-foreground: #FFFFFF;

  --status-muted: #94A3B8;
  --status-muted-foreground: #0F172A;
}
```

---

# 21. Recommended shadcn/ui Mapping

For shadcn/ui components, map semantic tokens rather than using brand hex values directly.

```css
:root {
  --background: #F8FAFC;
  --foreground: #0F172A;

  --card: #FFFFFF;
  --card-foreground: #0F172A;

  --popover: #FFFFFF;
  --popover-foreground: #0F172A;

  --primary: #1E3A8A;
  --primary-foreground: #FFFFFF;

  --secondary: #F1F5F9;
  --secondary-foreground: #1E293B;

  --muted: #F1F5F9;
  --muted-foreground: #64748B;

  --accent: #F59E0B;
  --accent-foreground: #172033;

  --destructive: #DC2626;
  --destructive-foreground: #FFFFFF;

  --border: #E2E8F0;
  --input: #CBD5E1;
  --ring: #1E3A8A;
}
```

Then components can use:

```tsx
<Button variant="default">
  Create Student
</Button>
```

rather than:

```tsx
<Button className="bg-[#1E3A8A]">
  Create Student
</Button>
```

---

# 22. Color Usage Decision Tree

When adding a new UI element, use this order:

```text
Is it the main action?
        │
        ├── YES → Primary
        │
        └── NO
             │
             ▼
Is it a system status?
        │
        ├── YES → Semantic Status Color
        │
        └── NO
             │
             ▼
Is it navigation/strong structure?
        │
        ├── YES → Primary Dark / Neutral
        │
        └── NO
             │
             ▼
Does it require special emphasis?
        │
        ├── YES → Accent
        │
        └── NO
             │
             ▼
Use Neutral / Semantic Surface
```

This prevents unnecessary color proliferation.

---

# 23. What Developers Should Avoid

## Avoid Random Hex Values

Bad:

```tsx
className="bg-[#123456]"
```

unless the color has been formally added to the design system.

---

## Avoid Colorful Dashboards

Bad:

```text
Blue Card
Orange Card
Green Card
Purple Card
Pink Card
Red Card
```

Good:

```text
Neutral Card
+ Blue indicator

Neutral Card
+ Green indicator

Neutral Card
+ Amber indicator
```

---

## Avoid Amber Everywhere

Bad:

```text
Amber button
Amber card
Amber sidebar
Amber tabs
Amber badges
Amber links
```

Amber should remain special.

---

## Avoid Primary Dark as Entire Dark Mode

Bad:

```css
.dark {
  --background: #152A63;
}
```

Good:

```css
.dark {
  --background: #0B1120;
  --card: #111827;
  --primary-dark: #152A63;
}
```

---

## Avoid Status Colors for Branding

Green, red, yellow, and info blue should communicate **system meaning**, not random decoration.

---

# 24. Developer Rules

When creating or modifying CampusFlow UI:

1. **Use semantic variables instead of hard-coded hex values.**
2. **Keep Primary Blue as the main brand identity.**
3. **Use Primary Dark mainly for strong/navigation surfaces.**
4. **Do not use Primary Dark as the entire Dark Mode background.**
5. **Use Accent sparingly.**
6. **Accent is not the default button color.**
7. **Use Neutral for borders, dividers, inputs, and structural UI.**
8. **Use semantic status colors for system states.**
9. **Never introduce random colors without a design-system reason.**
10. **Always test components in both Light and Dark Mode.**
11. **Do not rely on color alone to communicate status.**
12. **Maintain sufficient text and UI contrast.**
13. **Use icons, labels, typography, and shape alongside color.**
14. **Keep role colors limited to small identification elements.**
15. **Do not create separate visual themes for different user roles.**
16. **Prefer neutral cards with small colored indicators over colorful cards.**
17. **Use blue for hierarchy and amber for selective emphasis.**
18. **Use red for destructive states and green for successful states.**
19. **Keep the same semantic meaning for colors throughout every module.**
20. **If a new color is needed, first determine whether an existing semantic token can solve the problem.**

---

# 25. Quick Reference

## Brand

```text
Primary       #1E3A8A
Primary Dark  #152A63
Accent        #F59E0B
Neutral       #E2E8F0
```

## Light Mode

```text
Background    #F8FAFC
Card          #FFFFFF
Foreground    #0F172A
Muted         #F1F5F9
Border        #E2E8F0
Input         #CBD5E1
```

## Dark Mode

```text
Background    #0B1120
Card          #111827
Foreground    #F8FAFC
Muted         #1E293B
Border        #263449
Input         #334155
```

## Semantic

```text
Success       #16A34A
Warning       #D97706
Destructive   #DC2626
Info          #2563EB
Muted         #64748B
```

## Visual Priority

```text
1. Neutral
2. Primary
3. Primary Dark
4. Accent
5. Status Colors
```

---

# 26. Final Design Principle

CampusFlow should look like a **modern university enterprise platform**, not a colorful educational template.

The ideal visual balance is:

```text
        NEUTRAL
   ┌─────────────────┐
   │                 │
   │   Clean UI      │
   │                 │
   │   BLUE          │
   │   hierarchy     │
   │                 │
   │      • AMBER    │
   │        accent   │
   └─────────────────┘
```

### Remember

> **Blue establishes identity.**

> **Dark Blue establishes authority and structure.**

> **Neutral establishes clarity.**

> **Amber establishes emphasis.**

> **Semantic colors establish system meaning.**

The combination should remain restrained, consistent, accessible, and scalable across:

```text
Authentication
Dashboard
User Management
Academic Management
Finance
Payments
Courses
Students
Instructors
Departments
Programs
Reports
Settings
```

The goal is not to make every screen colorful.

The goal is to make every screen **recognizably CampusFlow**.