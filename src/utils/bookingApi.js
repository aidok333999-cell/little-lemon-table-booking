export function getToday(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fetchAPI(date) {
  const weekday = date.getDay();
  return weekday === 0 || weekday === 5 || weekday === 6
    ? ["17:00", "17:30", "18:30", "19:30", "20:30", "21:30"]
    : ["17:00", "18:00", "19:00", "20:00", "21:00"];
}

export function submitAPI(formData) {
  return Boolean(formData.date && formData.time);
}

export function validateBooking(data, today = getToday()) {
  const errors = {};
  if (!data.date) errors.date = "Please choose a reservation date.";
  else if (data.date < today) errors.date = "Please choose today or a future date.";
  if (!data.time) errors.time = "Please choose an available time.";
  const guests = Number(data.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 10) errors.guests = "Please enter between 1 and 10 guests.";
  return { isValid: Object.keys(errors).length === 0, errors };
}
