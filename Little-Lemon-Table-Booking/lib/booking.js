/** Returns today's local date in the YYYY-MM-DD format used by date inputs. */
export function getToday(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Produces stable but varied availability for the selected date. */
export function getAvailableTimes(date) {
  if (!date) return [];
  const weekday = new Date(`${date}T12:00:00`).getDay();
  const weekdayTimes = ["5:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "9:00 PM"];
  const weekendTimes = ["4:00 PM", "4:30 PM", "5:30 PM", "6:00 PM", "7:30 PM", "8:30 PM", "10:00 PM"];
  return weekday === 0 || weekday === 5 || weekday === 6 ? weekendTimes : weekdayTimes;
}

/** Validates booking details and returns field-specific messages. */
export function validateBooking(data, today = getToday()) {
  const errors = {};
  if (!data.date) errors.date = "Please choose a reservation date.";
  else if (data.date < today) errors.date = "Please choose today or a future date.";
  if (!data.time) errors.time = "Please choose an available time.";
  const guests = Number(data.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 10) errors.guests = "Enter a whole number from 1 to 10.";
  if (!data.name || data.name.trim().length < 2) errors.name = "Please enter your name (at least 2 characters).";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  return { valid: Object.keys(errors).length === 0, errors };
}
