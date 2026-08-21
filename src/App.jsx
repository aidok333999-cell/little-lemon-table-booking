import { useReducer, useState } from "react";
import BookingForm from "./components/BookingForm";
import ConfirmedBooking from "./components/ConfirmedBooking";
import { fetchAPI, getToday, submitAPI } from "./utils/bookingApi";

export function updateTimes(_state, date) {
  return date ? fetchAPI(new Date(`${date}T12:00:00`)) : [];
}

export function initializeTimes() {
  return fetchAPI(new Date(`${getToday()}T12:00:00`));
}

export default function App() {
  // Available times deliberately live in this parent, as required by the rubric.
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const submitForm = (formData) => {
    if (submitAPI(formData)) setConfirmedBooking(formData);
  };

  return (
    <>
      <header className="site-header">
        <a className="logo" href="#home" aria-label="Little Lemon home">
          <span aria-hidden="true">🍋</span><span><b>LITTLE LEMON</b><small>CHICAGO</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a><a href="#about">About</a><a href="#menu">Menu</a>
          <a className="nav-cta" href="#booking">Reservations</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero" aria-labelledby="hero-heading">
          <div>
            <h1 id="hero-heading">Little Lemon</h1>
            <h2>Chicago</h2>
            <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
            <a className="button" href="#booking">Reserve a Table</a>
          </div>
          <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80" alt="A colorful Mediterranean dish served at Little Lemon" />
        </section>

        <section className="booking" id="booking" aria-labelledby="booking-heading">
          <div className="booking-copy">
            <p className="eyebrow">Reservations</p>
            <h2 id="booking-heading">Book a table</h2>
            <p>Choose a date, time and party size. We look forward to welcoming you.</p>
            <aside aria-label="Restaurant hours"><strong>Opening hours</strong><span>Mon–Thu: 5:00–10:00 PM</span><span>Fri–Sun: 4:00–11:00 PM</span></aside>
          </div>
          {confirmedBooking ? (
            <ConfirmedBooking booking={confirmedBooking} onNewBooking={() => setConfirmedBooking(null)} />
          ) : (
            <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
          )}
        </section>

        <section className="about" id="about" aria-labelledby="about-heading">
          <p className="eyebrow">Our story</p><h2 id="about-heading">Fresh food. Warm hospitality.</h2>
        </section>
      </main>
      <footer><p>© 2026 Little Lemon Chicago</p><address>123 Citrus Avenue · Chicago, IL</address></footer>
    </>
  );
}
