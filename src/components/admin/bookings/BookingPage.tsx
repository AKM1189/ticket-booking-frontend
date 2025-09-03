import React, { useEffect, useState } from "react";
import BookingManagement from "./BookingManagement";
import BookingForm from "./BookingForm";
import Ticket from "./TicketPage";
import { useBookingStore } from "@/store/bookingStore";

export enum BookingCompType {
  bookingHome = "Booking Home",
  bookingForm = "Booking Form",
  ticket = "Ticket Page",
}

const BookingPage = () => {
  const [currentComp, setCurrentComp] = useState<BookingCompType>(
    BookingCompType.bookingHome,
  );
  const { setCurrentBooking } = useBookingStore();

  useEffect(() => {
    setCurrentBooking(null);
  }, []);

  if (currentComp === BookingCompType.bookingForm)
    return <BookingForm setCurrentComp={setCurrentComp} />;
  else if (currentComp === BookingCompType.ticket)
    return <Ticket setCurrentComp={setCurrentComp} />;
  else return <BookingManagement setCurrentComp={setCurrentComp} />;
};

export default BookingPage;
