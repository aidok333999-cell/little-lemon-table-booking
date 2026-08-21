import { describe, expect, it } from "vitest";
import { fetchAPI, getToday, validateBooking } from "./bookingApi";

describe("booking utilities", () => {
  it("formats today's date", () => expect(getToday(new Date(2026, 7, 21))).toBe("2026-08-21"));
  it("returns available times", () => expect(fetchAPI(new Date("2026-08-21T12:00:00"))).toContain("17:00"));
  it("rejects past dates and invalid party sizes", () => {
    const result = validateBooking({ date: "2026-08-20", time: "17:00", guests: "11" }, "2026-08-21");
    expect(result.isValid).toBe(false);
    expect(result.errors.date).toMatch(/future/);
    expect(result.errors.guests).toMatch(/1 and 10/);
  });
  it("accepts a valid booking", () => expect(validateBooking({ date: "2026-08-22", time: "17:00", guests: "4" }, "2026-08-21").isValid).toBe(true));
});
