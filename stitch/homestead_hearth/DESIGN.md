# Design System Strategy: The Curated Hearth

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Sanctuary"**

This design system rejects the "SaaS-in-a-box" aesthetic—no cold blues, no rigid 1px dividers, and no aggressive sharp corners. Instead, we are building a "Digital Sanctuary." The goal is to make the user feel like they are stepping into a well-lit, architecturally designed home. 

We achieve this through **Organic Asymmetry** and **Tonal Depth**. By leaning into high-contrast typography scales (the "Editorial Look") and prioritizing breathing room over information density, we move away from "utility" and toward "experience." Elements should feel like they are resting on a surface, not stuck to a grid.

---

## 2. Colors: The Earth & Light Palette
Our palette is rooted in the natural world—Sage, Cream, and Earthy Brown. These are not just decorative; they are functional tools for wayfinding.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited for sectioning.** 
To define the end of a sidebar or the start of a header, use a background shift. A `surface-container-low` (#f8f4db) section sitting against a `surface` (#fefae0) background creates a sophisticated, "borderless" boundary that feels modern and expensive.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical materials.
*   **Base:** `surface` (#fefae0) – The floor of your application.
*   **Sections:** `surface-container-low` (#f8f4db) – Large layout blocks (e.g., Main Content Area).
*   **Cards/Elements:** `surface-container-highest` (#e7e3ca) – High-importance interactive elements.
*   **Nesting:** When placing a card inside a section, the card must always be a "higher" tier than the background it sits on to create natural perceived lift.

### The "Glass & Gradient" Rule
To prevent the UI from feeling "flat" or "muddy," use **Signature Textures**:
*   **Glassmorphism:** Use `surface` colors at 70% opacity with a `20px backdrop-blur` for floating navigation bars or modals.
*   **The Earthy Gradient:** For primary CTAs, use a subtle linear gradient from `primary` (#485422) to `primary_container` (#606c38). This adds "soul" and prevents the buttons from looking like plastic blocks.

---

## 3. Typography: The Editorial Voice
We use typography to convey authority and warmth simultaneously.

*   **Display & Headlines (Plus Jakarta Sans):** These are our "statement furniture." Use `display-lg` for welcome screens and `headline-md` for page titles. The generous x-height of Plus Jakarta Sans feels open and inviting.
*   **Body & Labels (Be Vietnam Pro):** This is our "utility textile." It is clean, highly legible, and lacks the sterile geometry of Inter or Roboto. 
*   **The Hierarchy Rule:** Always pair a large `headline-lg` with a significantly smaller `body-md`. This high-contrast scale mimics high-end interior design magazines, making the SaaS feel like a curated publication rather than a spreadsheet.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, shadows are a last resort, and lines are forbidden.

### The Layering Principle
Depth is achieved through the **Material Stack**. 
1.  **Level 0:** `surface` (The Foundation)
2.  **Level 1:** `surface-container` (The Functional Zone)
3.  **Level 2:** `surface-container-highest` (The Interactive Component)

### Ambient Shadows
When an element must float (e.g., a dropdown or a modal), use an **Ambient Shadow**:
*   **Color:** Use `on_surface` (#1d1c0d) at 6% opacity.
*   **Blur:** Minimum `40px` to `60px`. 
*   **Philosophy:** The shadow should be felt, not seen. It should look like soft sunlight hitting a heavy object.

### The "Ghost Border" Fallback
If accessibility requirements (WCAG) demand a border, use a **Ghost Border**: 
*   `outline_variant` (#c7c8b9) at **15% opacity**. This provides a hint of structure without breaking the organic flow of the "Digital Sanctuary."

---

## 5. Components: Soft & Intentional

### Buttons (The Tactile Stones)
*   **Primary:** Background: `primary` gradient; Text: `on_primary`. Corner radius: `xl` (3rem) for a "pebble" feel.
*   **Secondary:** Background: `tertiary_fixed`; Text: `on_tertiary_fixed`. No border.
*   **Interaction:** On hover, slightly increase the shadow blur and shift the background to `primary_container`.

### Input Fields (The Inset Wells)
*   **Style:** No borders. Use `surface_container_highest` as the background.
*   **Shape:** `md` (1.5rem) rounded corners.
*   **Focus State:** A soft 2px glow using `primary` at 30% opacity. Never use a high-contrast black or blue ring.

### Cards & Lists (The Borderless Groupings)
*   **Rule:** Forbid the use of divider lines between list items.
*   **Implementation:** Use `16px` of vertical white space and a subtle background hover state (`surface_dim`) to separate items. This keeps the layout "breathing."

### New Component: The "Hearth" Container
*   **Concept:** A specialized container for hero content or key metrics.
*   **Styling:** Uses a `tertiary_container` (#875f35) background with a soft `48px` inner padding. It acts as a warm "anchor" for the page.

---

## 6. Do's and Don'ts

### Do:
*   **Do** embrace extreme roundedness. Use `xl` (3rem) for large containers to make the app feel "soft."
*   **Do** use "Sage" (`primary_fixed`) for sidebar backgrounds to differentiate the navigation from the workspace without using a line.
*   **Do** allow elements to overlap slightly (e.g., a card peeking over a header) to create a sense of three-dimensional space.

### Don't:
*   **Don't** use pure black (#000000) for text. Always use `on_surface` (#1d1c0d) or `primary` (#485422).
*   **Don't** use "Alert Red" for warnings if possible. Use the `error` (#ba1a1a) token, but pair it with a soft `error_container` background to take the "sting" out of the error.
*   **Don't** cram information. If a screen feels busy, increase the padding by 1.5x. In this system, white space is a premium feature.