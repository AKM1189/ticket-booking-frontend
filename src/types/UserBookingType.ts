export interface SeatInfo {
  seatId: string;
  type: string;
  price: string;
}

export interface TicketInfo {
  id: number;
  ticketNumber: string;
  qrCode: string;
  issuedAt: string;
}

export interface UserBookingType {
  id: number;
  totalAmount: string;
  ticket: TicketInfo;
  status: string;
  schedule: {
    showTime: string;
    showDate: string;
    language: string;
    subtitle: string;
  };
  movie: {
    title: string;
    status: string;
    experience: string[];
  };
  theatre: {
    name: string;
    location: string;
    region: string;
    city: string;
  };
  screen: {
    name: string;
    type: string;
  };
  seatList: SeatInfo[];
}