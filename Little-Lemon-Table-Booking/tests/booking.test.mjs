import test from "node:test";
import assert from "node:assert/strict";
import { getAvailableTimes, getToday, validateBooking } from "../lib/booking.js";

test("getToday returns an input-compatible local date", () => assert.equal(getToday(new Date(2026, 7, 20)), "2026-08-20"));
test("availability is empty until a date is selected", () => assert.deepEqual(getAvailableTimes(""), []));
test("weekend availability includes a late slot", () => assert.ok(getAvailableTimes("2026-08-22").includes("10:00 PM")));
test("empty form produces meaningful errors", () => {
  const result = validateBooking({ date:"", time:"", guests:"", name:"", email:"" }, "2026-08-20");
  assert.equal(result.valid, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ["date","email","guests","name","time"]);
});
test("past dates and oversized parties are rejected", () => {
  const result = validateBooking({ date:"2026-08-19", time:"7:00 PM", guests:"11", name:"Maya", email:"maya@example.com" }, "2026-08-20");
  assert.match(result.errors.date, /future/); assert.match(result.errors.guests, /1 to 10/);
});
test("valid reservation passes validation", () => {
  const result = validateBooking({ date:"2026-08-21", time:"7:00 PM", guests:"4", name:"Maya", email:"maya@example.com" }, "2026-08-20");
  assert.equal(result.valid, true); assert.deepEqual(result.errors, {});
});
