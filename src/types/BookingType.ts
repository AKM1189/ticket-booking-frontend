export type BookingInputType = {
  scheduleId: string;
  selectedSeats: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  note: string;
  userId: string;
  totalAmount: string;
};

export type BookingType = {
  id: number;
  bookingDate: string;
  seatList: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  note: string;
  totalAmount: string;
  schedule: any;
  user: any;
  status: string;
  movie: any;
  theatre: any;
  ticket: any;
};

// export type BookingTicketType = {
//   id: number;
//   bookingDate: string;
//   seatList: string[];
//   customerName: string;
//   customerEmail: string;
//   customerPhone: string;
//   note: string;
//   totalAmount: string;
//   schedule: any;
//   user: any;
//   status: string;
//   movie: an
// };
