---
description: "Use when building or changing frontend UI, React components, forms, navigation, styling, or interaction patterns. Enforces WACP frontend accessibility practices grounded in WCAG 2.2 AA, POUR, keyboard support, semantic HTML, ARIA, focus, contrast, responsive reflow, forms, status messages, and inclusive content."
name: "Frontend WACP Accessibility"
applyTo: "frontend/src/**/*.{ts,tsx,js,jsx,css}, frontend/index.html"
---
# Frontend WACP Accessibility Guidelines

Apply Web Accessibility Coding Practices (WACP) to frontend work. In this project, WACP means WCAG-based coding practices. Treat WCAG 2.2 AA as the default target, and use the POUR model as the design check: interfaces must be perceivable, operable, understandable, and robust. WCAG 2.2 is backward compatible with WCAG 2.1 for these practices.

## Baseline Rules

- Prefer semantic HTML and native controls before adding ARIA. Use `button`, `a`, `label`, `fieldset`, `legend`, `nav`, `main`, `section`, `table`, and heading elements according to their meaning.
- Add ARIA only when native semantics are not enough. Keep accessible name, role, value, state, and relationships accurate for custom controls.
- Preserve keyboard access for every interactive feature. Tab order must follow visual and task order, focus must never be trapped, and all actions must be reachable without a mouse.
- Keep focus visible. Do not remove outlines unless replacing them with a clear, high-contrast focus style.
- Do not use color, shape, position, animation, or iconography as the only way to convey meaning. Pair visual signals with text or programmatic state.
- Maintain contrast of at least 4.5:1 for normal text and 3:1 for large text, icons, graphical controls, and focus indicators.
- Support responsive reflow and text resize. Content must remain usable at small viewports and 200% browser zoom without two-dimensional scrolling for ordinary page content.
- Respect user motion preferences. Avoid flashing content, autoplaying media, and nonessential animation; gate motion-heavy effects behind `prefers-reduced-motion`.

## React Component Practices

- Keep visual labels and accessible names aligned. If a control displays text, its accessible name should include that same text.
- Use stable IDs for labels, descriptions, errors, and controlled relationships. In React, prefer `useId()` when an ID is needed inside a reusable component.
- For icon-only buttons, provide an `aria-label` that describes the action, not the icon.
- For links, use meaningful link text that describes the destination or action in context. Use buttons for in-place actions and links for navigation.
- For dialogs, menus, dropdowns, and overlays, manage focus intentionally: move focus into the opened surface, support Escape where expected, restore focus on close, and expose expanded/open state.
- For async loading, validation, and save/delete outcomes, expose status or error messages with appropriate text and live-region semantics such as `role="status"`, `role="alert"`, or `aria-live`.

## Forms And Input

- Every input, select, textarea, checkbox, radio group, and custom field needs a programmatically associated label.
- Provide instructions before they are needed. Placeholder text is not a substitute for labels or required instructions.
- Identify validation errors in text, associate them with the field using `aria-describedby`, and set `aria-invalid` when a field is invalid.
- Use `autocomplete` tokens where the input purpose is known, especially for personal, contact, address, payment, or authentication fields.
- Do not submit, navigate, or otherwise change context just because a field receives focus or a value changes unless the user was clearly told beforehand.

## Visual And Content Checks

- Keep heading order meaningful and avoid skipping levels for visual sizing. Style headings with CSS instead of changing levels for appearance.
- Provide useful `alt` text for informative images and empty `alt=""` for decorative images.
- Avoid images of text unless the text is decorative or essential to the presentation.
- Keep page titles, headings, labels, error messages, and button text specific to the user task.
- Ensure hover or focus-revealed content is dismissible, hoverable, and persistent long enough to use.

## Verification Expectations

- Before finishing UI work, check keyboard-only navigation, focus visibility, screen-reader-oriented names/roles where practical, responsive behavior, and color contrast for changed surfaces.
- Run the narrowest existing validation command that fits the change, usually `npm run lint --workspace=frontend` or `npm run build --workspace=frontend` from the repository root.
- If an automated check cannot verify a WACP requirement, note the manual accessibility check that was performed or remains needed.

Reference W3C resources when deeper detail is needed: WCAG Understanding docs, How to Meet WCAG, and the WCAG 2 Overview.