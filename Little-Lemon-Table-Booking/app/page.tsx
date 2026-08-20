"use client";

import { FormEvent, useMemo, useState } from "react";
import { getAvailableTimes, getToday, validateBooking } from "../lib/booking.js";

type FormData = { date:string; time:string; guests:string; occasion:string; name:string; email:string; seating:string };
const initialForm:FormData={date:"",time:"",guests:"2",occasion:"None",name:"",email:"",seating:"Indoor"};

export default function Home(){
 const [form,setForm]=useState<FormData>(initialForm); const [errors,setErrors]=useState<Record<string,string>>({}); const [confirmation,setConfirmation]=useState<FormData|null>(null);
 const availableTimes=useMemo(()=>getAvailableTimes(form.date),[form.date]);
 function update(field:keyof FormData,value:string){setForm(c=>({...c,[field]:value,...(field==="date"?{time:""}:{})}));setErrors(c=>({...c,[field]:""}));}
 function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const result=validateBooking(form);setErrors(result.errors);if(result.valid){setConfirmation(form);window.scrollTo({top:0,behavior:"smooth"});}}
 function startAgain(){setForm(initialForm);setErrors({});setConfirmation(null);}
 return <>
  <header className="site-header"><a className="brand" href="#top" aria-label="Little Lemon home"><span className="brand-mark" aria-hidden="true">L</span><span><strong>LITTLE LEMON</strong><small>CHICAGO</small></span></a><nav aria-label="Primary navigation"><a href="#menu">Menu</a><a href="#about">About</a><a className="nav-button" href="#booking">Reserve a table</a></nav></header>
  <main id="top">
   <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow">A table is waiting</p><h1 id="hero-title">Make tonight<br/><em>delicious.</em></h1><p>Fresh Mediterranean food, warm Chicago hospitality and a table saved just for you.</p><a className="primary-button" href="#booking">Book your table <span aria-hidden="true">→</span></a></div><div className="hero-art" role="img" aria-label="Mediterranean dinner table with lemon, herbs and plates"><div className="plate plate-one"><span>LEMON</span></div><div className="plate plate-two"><span>HERBS</span></div><div className="lemon lemon-one"/><div className="lemon lemon-two"/></div></section>
   <section className="booking-section" id="booking" aria-labelledby="booking-title">
    <div className="section-intro"><p className="eyebrow">Reservations</p><h2 id="booking-title">Save your seat</h2><p>Choose your details below. We will have everything ready when you arrive.</p><div className="info-card"><strong>Opening hours</strong><span>Mon–Thu · 5:00–10:00 PM</span><span>Fri–Sun · 4:00–11:00 PM</span></div></div>
    {confirmation?<section className="confirmation" aria-live="polite" aria-labelledby="confirmation-title"><div className="check" aria-hidden="true">✓</div><p className="eyebrow">Reservation confirmed</p><h2 id="confirmation-title">See you soon, {confirmation.name}!</h2><p>Your table for <strong>{confirmation.guests}</strong> is booked on <strong>{new Date(`${confirmation.date}T12:00:00`).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</strong> at <strong>{confirmation.time}</strong>.</p><p className="confirmation-note">A confirmation has been prepared for {confirmation.email}.</p><button className="secondary-button" type="button" onClick={startAgain}>Make another reservation</button></section>:
    <form className="booking-form" onSubmit={submit} noValidate aria-label="Table reservation form">
     <div className="form-row"><Field label="Date" id="date" error={errors.date}><input id="date" type="date" min={getToday()} value={form.date} onChange={e=>update("date",e.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date?"date-error":undefined} required/></Field><Field label="Time" id="time" error={errors.time}><select id="time" value={form.time} onChange={e=>update("time",e.target.value)} disabled={!form.date} aria-invalid={!!errors.time} aria-describedby={errors.time?"time-error":undefined} required><option value="">{form.date?"Select a time":"Choose date first"}</option>{availableTimes.map((time:string)=><option key={time}>{time}</option>)}</select></Field></div>
     <div className="form-row"><Field label="Number of guests" id="guests" error={errors.guests}><input id="guests" type="number" min="1" max="10" value={form.guests} onChange={e=>update("guests",e.target.value)} aria-invalid={!!errors.guests} aria-describedby={errors.guests?"guests-error":"guests-help"} required/><small id="guests-help">For parties larger than 10, please call us.</small></Field><Field label="Occasion" id="occasion"><select id="occasion" value={form.occasion} onChange={e=>update("occasion",e.target.value)}><option>None</option><option>Birthday</option><option>Anniversary</option><option>Engagement</option><option>Business dinner</option></select></Field></div>
     <div className="form-row"><Field label="Your name" id="name" error={errors.name}><input id="name" type="text" autoComplete="name" placeholder="e.g. Maya Thompson" value={form.name} onChange={e=>update("name",e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name?"name-error":undefined} required/></Field><Field label="Email address" id="email" error={errors.email}><input id="email" type="email" autoComplete="email" placeholder="maya@example.com" value={form.email} onChange={e=>update("email",e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email?"email-error":undefined} required/></Field></div>
     <fieldset><legend>Seating preference</legend><div className="radio-group">{["Indoor","Patio","No preference"].map(choice=><label key={choice}><input type="radio" name="seating" value={choice} checked={form.seating===choice} onChange={e=>update("seating",e.target.value)}/><span>{choice}</span></label>)}</div></fieldset>
     <button className="submit-button" type="submit">Confirm reservation <span aria-hidden="true">→</span></button><p className="privacy">By booking, you agree to receive reservation updates by email.</p>
    </form>}
   </section>
   <section className="promise" id="about"><p className="eyebrow">The Little Lemon promise</p><h2>Good food. Good people.<br/>A very good evening.</h2></section>
  </main><footer><span>© 2026 Little Lemon Chicago</span><span>123 Citrus Avenue · (312) 555-0198</span></footer>
 </>;
}

function Field({label,id,error,children}:{label:string;id:string;error?:string;children:React.ReactNode}){return <div className="field"><label htmlFor={id}>{label}</label>{children}{error&&<span className="error" id={`${id}-error`} role="alert">{error}</span>}</div>}
