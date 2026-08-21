import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BookingForm from "./BookingForm";

describe("BookingForm", () => {
  it("renders accessible booking controls", () => {
    render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={vi.fn()} submitForm={vi.fn()} />);
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /confirm table reservation/i })).toBeInTheDocument();
  });

  it("shows meaningful errors for an incomplete form", () => {
    render(<BookingForm availableTimes={["17:00"]} dispatch={vi.fn()} submitForm={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /confirm table reservation/i }));
    expect(screen.getByText(/choose a reservation date/i)).toHaveAttribute("role", "alert");
    expect(screen.getByText(/choose an available time/i)).toBeInTheDocument();
  });

  it("submits valid form data", () => {
    const submitForm = vi.fn();
    render(<BookingForm availableTimes={["17:00"]} dispatch={vi.fn()} submitForm={submitForm} />);
    const future = `${new Date().getFullYear() + 1}-01-10`;
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: future } });
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: "17:00" } });
    fireEvent.click(screen.getByRole("button", { name: /confirm table reservation/i }));
    expect(submitForm).toHaveBeenCalledWith(expect.objectContaining({ date: future, time: "17:00", guests: "2" }));
  });
});
