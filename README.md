# Little Lemon Table Booking — Front-End Capstone

A responsive and accessible React table-reservation app for the Meta Front-End Developer Capstone. The project follows the Little Lemon visual language and implements every item in the peer-review rubric.

## Features

- Responsive desktop and mobile layout based on the Little Lemon Figma design
- Semantic `header`, `nav`, `main`, `section`, `aside`, `form`, and `footer` elements
- Accessible labels, native controls, focus states, ARIA error descriptions and live confirmation
- `BookingForm` implemented as a child of the parent `App` component
- Available-time state managed in `App` with `useReducer`
- Date-dependent availability, client-side validation and field-level error messages
- Confirmation screen after successful submission
- Meta description, mobile viewport, theme color and Open Graph tags
- Unit tests for the form, validation, available times and edge cases

## Run locally

```bash
git clone https://github.com/aidok333999-cell/little-lemon-table-booking.git
cd little-lemon-table-booking
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Test and build

```bash
npm test
npm run build
```

## Project structure

```text
src/
├── components/
│   ├── BookingForm.jsx
│   ├── BookingForm.test.jsx
│   └── ConfirmedBooking.jsx
├── utils/
│   ├── bookingApi.js
│   └── bookingApi.test.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Rubric notes

`BookingForm` receives `availableTimes`, `dispatch`, and `submitForm` from `App`. When the date changes, the child dispatches the selected date; the parent reducer calculates and stores the new available-time state. Invalid submissions remain on the form and show specific, screen-reader-accessible messages.
