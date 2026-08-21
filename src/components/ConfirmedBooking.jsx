export default function ConfirmedBooking({ booking, onNewBooking }) {
  return (
    <section className="confirmation" aria-live="polite" aria-labelledby="confirmation-heading">
      <span className="check" aria-hidden="true">✓</span>
      <h2 id="confirmation-heading">Booking confirmed!</h2>
      <p>Your table for <strong>{booking.guests}</strong> is reserved on <strong>{booking.date}</strong> at <strong>{booking.time}</strong>.</p>
      <button className="button" type="button" onClick={onNewBooking}>Make another booking</button>
    </section>
  );
}
