import { useState } from "react";
import { getToday, validateBooking } from "../utils/bookingApi";

const initialForm = { date: "", time: "", guests: "2", occasion: "None" };

export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const changeField = (event) => {
    const { name, value } = event.target;
    const next = { ...form, [name]: value };
    if (name === "date") {
      next.time = "";
      dispatch(value);
    }
    setForm(next);
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = validateBooking(form);
    setErrors(result.errors);
    if (result.isValid) submitForm(form);
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-label="Table booking form">
      <FormField label="Choose date" id="res-date" error={errors.date}>
        <input id="res-date" name="date" type="date" min={getToday()} value={form.date} onChange={changeField} required aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "res-date-error" : undefined} />
      </FormField>
      <FormField label="Choose time" id="res-time" error={errors.time}>
        <select id="res-time" name="time" value={form.time} onChange={changeField} required aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? "res-time-error" : undefined}>
          <option value="">Select a time</option>
          {availableTimes.map((time) => <option key={time} value={time}>{time}</option>)}
        </select>
      </FormField>
      <FormField label="Number of guests" id="guests" error={errors.guests}>
        <input id="guests" name="guests" type="number" min="1" max="10" value={form.guests} onChange={changeField} required aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? "guests-error" : "guests-hint"} />
        <small id="guests-hint">1–10 guests</small>
      </FormField>
      <FormField label="Occasion" id="occasion">
        <select id="occasion" name="occasion" value={form.occasion} onChange={changeField}>
          <option>None</option><option>Birthday</option><option>Anniversary</option>
        </select>
      </FormField>
      <button className="button submit" type="submit" aria-label="Confirm table reservation">Make Your Reservation</button>
    </form>
  );
}

function FormField({ label, id, error, children }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}{error && <p className="error" id={`${id}-error`} role="alert">{error}</p>}</div>;
}
