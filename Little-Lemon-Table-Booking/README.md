# Little Lemon Table Booking

A responsive React booking experience created for the Meta Front-End Developer Capstone peer-graded assignment.

## Features

- Accessible form with labels, fieldsets, ARIA error states and keyboard focus styles
- Date-dependent available times and guest limits
- Client-side validation with clear field-specific error messages
- Confirmation state with a reservation summary
- Responsive desktop, tablet and mobile layouts
- Unit tests for date handling, availability, validation and edge cases
- Semantic header, navigation, main sections and footer

## Run locally

1. Install Node.js 22 or later.
2. Clone this repository and open the project folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL shown in the terminal.

## Tests

- Booking unit tests: `node --test tests/booking.test.mjs`
- Production build: `npm run build`

## Project structure

- `app/page.tsx` — main React interface and booking flow
- `app/globals.css` — responsive design and interaction states
- `lib/booking.js` — reusable availability and validation logic
- `tests/booking.test.mjs` — unit and edge-case tests

## Accessibility

The form uses native input types, explicit labels, a semantic fieldset and legend, `aria-invalid`, linked error descriptions, live confirmation feedback, visible focus states and sufficient color contrast.
