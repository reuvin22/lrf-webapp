# Tone and Manner – System Design Guide

This document defines the tone, manner, and design philosophy of the system. It serves as a foundational reference within the brand and UI/UX design guide, ensuring consistency across all touchpoints—from visual design to microcopy. The system's identity is inspired by playful, organic green illustrations characterized by rounded shapes, bold outlines, and a vibrant, energetic presence.

---

## 1. Brand Personality

The system embodies a personality that is both approachable and professional, balancing warmth with reliability.

| Attribute     | Description                                  |
|---------------|----------------------------------------------|
| Playful       | Engaging and lively user experience          |
| Approachable  | Friendly and easy to use                     |
| Modern        | Clean and contemporary design                |
| Energetic     | Responsive and dynamic interactions          |
| Trustworthy   | Stable, reliable, and clear                  |

### Brand Archetypes

- **The Creator** — Imaginative and expressive, driven by a desire to build meaningful experiences.
- **The Caregiver** — Supportive and nurturing, focused on guiding users with empathy and care.

---

## 2. Voice and Tone Guidelines

The system communicates in a way that feels human, helpful, and optimistic. Language should reduce friction and build confidence.

### Tone Characteristics

- **Friendly and conversational** — Write as if speaking to a colleague, not a machine.
- **Clear and concise** — Eliminate jargon; get to the point.
- **Encouraging and supportive** — Celebrate progress and guide through setbacks.
- **Optimistic and positive** — Frame messages constructively, even in error states.

### Example Microcopy

| Context          | Example                                          |
|------------------|--------------------------------------------------|
| Welcome Message  | Welcome! Let's get things moving.                |
| Success Message  | All set! You're good to go.                      |
| Error Message    | Oops! Something went wrong. Let's try again.     |
| Empty State      | Nothing here yet—let's create something amazing. |
| Loading State    | Working on it...                                 |
| Call-to-Action   | Get Started                                      |

---

## 3. Visual Design Principles

### Color Palette

| Color         | Hex Code  | Usage                            |
|---------------|-----------|----------------------------------|
| Primary Green | `#0F9D7A` | Primary buttons and highlights   |
| Light Green   | `#8BC34A` | Accents and success states       |
| Deep Teal     | `#0B7A66` | Hover states                     |
| Charcoal      | `#1F1F1F` | Text and outlines                |
| Soft Gray     | `#F5F7F6` | Backgrounds                      |

### Typography

- **Primary Font:** Inter or Poppins
- **Secondary Font:** Nunito
- **Style:** Rounded, modern, and highly readable
- Use consistent type scales and generous line heights to maintain clarity across screen sizes.

---

## 4. UI and UX Guidelines

### Shapes and Components

- Rounded corners with a radius of **12–20px**
- Organic and soft shapes that reflect the brand's playful nature
- Clean layouts with **ample whitespace**
- Bold outlines for visual clarity and definition

### Buttons and Clickable Elements

- All clickable elements — `<button>`, `<a>`, and any `div`/`span` with an `onClick` — **must include `cursor-pointer`** in their class list.
- Never rely on the browser's default cursor for interactive elements; always make affordance explicit.

### Motion and Interaction

| Interaction       | Animation Style          |
|-------------------|--------------------------|
| Button Hover      | Gentle scale or bounce   |
| Loading Indicator | Soft pulsing animation   |
| Notifications     | Smooth slide-in          |
| Toggle Actions    | Fluid transitions        |

All animations should feel natural and purposeful—never distracting. Aim for durations between **150–300ms** with ease-out curves.

---

## 5. Iconography and Illustrations

- **Rounded and hand-drawn styles** that align with the organic visual identity
- **Thick, consistent strokes** for legibility at all sizes
- **Friendly and minimal designs** — avoid unnecessary detail
- **Playful illustrations** for onboarding flows, empty states, and feature introductions

Icons and illustrations should feel cohesive as a family, sharing the same weight, corner radius, and color palette.

---

## 6. Core Design Principles

| Principle                    | Description                                        |
|------------------------------|----------------------------------------------------|
| Clarity First                | Ensure intuitive user experiences                  |
| Human-Centered               | Design with empathy and accessibility              |
| Delight in Simplicity        | Keep interfaces simple yet engaging                |
| Consistency Builds Trust     | Maintain visual and tonal harmony                  |
| Efficiency with Personality  | Balance usability with charm                       |

---

## 7. Brand Statement

> *"A vibrant and intuitive system designed to simplify workflows with clarity, creativity, and confidence."*

---

## 8. Tagline Options

- **Playful by Design. Powerful by Nature.**
- **Where Simplicity Comes to Life.**
- **Designed to Flow.**
- **Smart Solutions with a Human Touch.**

---

---

## 9. Component Organization

### Modals Folder

All modal components live under `src/components/modals/`. A barrel `index.js` re-exports every modal for clean single-line imports.

```
src/
└── components/
    └── modals/
        ├── index.js          # Barrel — re-exports all modals
        ├── ConfirmModal.jsx  # Reusable destructive-action confirmation dialog
        └── FormModal.jsx     # Reusable add / edit / view form dialog
```

#### When to add a new modal

Create a new file under `src/components/modals/` whenever a UI operation requires an overlay that:

- Confirms a destructive or irreversible action → extend or reuse `ConfirmModal`
- Collects or displays structured data (forms, detail views) → extend or reuse `FormModal`
- Has a unique interaction not covered by the above → create a new focused modal file

Always export the new modal through `index.js`.

#### Modal design rules

- Panels use `rounded-2xl` (20 px) corners and a blurred `backdrop-blur-sm` overlay.
- Enter animation: `animate-modal-in` (scale + fade, 200 ms ease-out, defined in `index.css`).
- Primary action buttons use brand green `#0F9D7A` / hover `#0B7A66`.
- Destructive action buttons use `#EF4444` / hover `red-600`.
- Cancel / close buttons use neutral gray (`bg-gray-100` or `bg-white border`).
- All modals must include `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the heading.
- Clicking the backdrop always dismisses the modal via the `onClose` / `onCancel` handler.

---

*This document is part of the system's brand and UI/UX design guide. It should be referenced during design reviews, content creation, and development to ensure a consistent and cohesive experience.*
