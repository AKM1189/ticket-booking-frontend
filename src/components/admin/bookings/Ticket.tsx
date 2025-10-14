import { Button, Group, Loader, Title, Text } from "@mantine/core";
import {
  IconCalendar,
  IconClock,
  IconDownload,
  IconMapPin,
  IconPrinter,
} from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import domtoimage from "dom-to-image";
import { useBookingStore } from "@/store/bookingStore";
import { getBookingById } from "@/api/function/admin/bookingApi";
import { useNavigate } from "react-router";
import { routes } from "@/routes";

const Ticket = () => {
  const [isLoading, setLoading] = useState(true);
  const ticketRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { currentBooking } = useBookingStore();
  const [bookingData, setBookingData] = useState<any>(null);



  useEffect(() => {
    if (!currentBooking) {
      navigate(routes.user.home)
    }
    const getCurrentBooking = async () => {
      if (currentBooking) {
        const booking = await getBookingById(currentBooking);
        setBookingData(booking?.data);

        setLoading(false);
      }
    };

    getCurrentBooking();
  }, [currentBooking]);

  // Print ticket
  const handlePrint = useReactToPrint({
    contentRef: ticketRef,
  });

  // Download PDF
  const handleDownload = async () => {
    const element = ticketRef.current;
    if (!element) return;

    try {
      const dataUrl = await domtoimage.toPng(ticketRef.current, {
        bgcolor: "#ffffff", // background color
        quality: 1, // max quality
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      const link = document.createElement("a");
      link.download = "ticket.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[500px] w-full">
        <Loader type="dots" size={60} />
        <p className="text-[12px] text-gray-500">Generating Ticket</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center my-5">
        {/* <div className="w-10 h-10 bg-surface rounded-full mx-auto mb-[-18px] z-100 border-b border-gray-400"></div> */}
        <div ref={ticketRef} className="overflow-hidden">
          <TicketCard
            movie={bookingData?.movie}
            theatre={bookingData?.theatre}
            screen={bookingData?.screen}
            schedule={bookingData?.schedule}
            seatList={bookingData?.seatList}
            ticket={bookingData?.ticket}
            totalAmount={bookingData?.totalAmount}
          />
        </div>
        {/* <div className="w-10 h-10 bg-background rounded-full mx-auto mt-[-18px] z-100 border-t border-gray-400"></div> */}
      </div>
      <Group gap={50} justify="center" mt={40}>
        <Button
          className="dashboard-btn !w-[200px]"
          onClick={handlePrint}
          leftSection={<IconPrinter size={20} />}
        >
          Print Ticket
        </Button>
        <Button
          className="dashboard-btn !w-[200px]"
          onClick={handleDownload}
          leftSection={<IconDownload size={20} />}
        >
          Download Ticket
        </Button>
      </Group>
    </div>
  );
};

export default Ticket;

type TicketProps = {
  movie: any;
  theatre: any;
  screen: any;
  schedule: any;
  seatList: any;
  ticket: any;
  totalAmount: string;
};

const TicketCard: React.FC<TicketProps> = ({
  movie,
  theatre,
  screen,
  schedule,
  seatList,
  ticket,
  totalAmount,
}) => {
  return (
    <div className="min-w-[350px] rounded-[15px]  border border-gray-400 bg-white p-6 text-darkGray max-w-[350px] select-none z-10">
      <p className="text-gray-400 text-center text-[10px] mb-3 uppercase">
        Movie Palace Cinema
      </p>
      <Title
        size={"xl"}
        className="text-gray-800 text-2xl font-bold mb-2 mt-4 uppercase text-center"
      >
        {movie?.title} ({screen?.type})
      </Title>
      <div className="flex justify-center">
        <p className="text-gray-600 text-sm mt-2 uppercase flex">
          <p className="font-semibold me-1">{schedule?.language} </p> | Sub:{" "}
          <p className="font-semibold ms-1">{schedule?.subtitle}</p>
        </p>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-700 mt-5">
        <Group>
          <span className="font-semibold">
            <IconCalendar size={18} />
          </span>{" "}
          {schedule?.showDate}
        </Group>

        <Group>
          <span className="font-semibold">
            <IconClock size={18} />
          </span>{" "}
          {schedule?.showTime}
        </Group>

        <Group>
          <span className="font-semibold">
            <IconMapPin size={18} />
          </span>{" "}
          {theatre?.name} ({screen?.name})
        </Group>

        <div className="mt-3">
          <span className="font-semibold text-left">
            {seatList?.length} Seats:
          </span>
          <div className="flex flex-col gap-2 mt-2 text-xs px-2">
            {seatList?.map((seat) => (
              <div className="flex justify-between">
                <span>
                  <span className="text-black font-medium">{seat?.seatId}</span>{" "}
                  <span>({seat?.type})</span>
                </span>
                <span>$ {seat?.price}</span>
              </div>
            ))}
            <hr className="text-gray-300 border-t-2" />
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800 text-lg">Total</span>
              <span className="font-semibold text-gray-800 text-lg">
                $ {totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center items-center gap-1">
        {/* Optional QR code */}
        <img src={ticket?.qrCode} alt="QR Code" className="w-20 h-20" />
        <div className="text-center">
          <p className="text-xs text-darkGray mt-2">
            Booking ID: {ticket?.ticketNumber}
          </p>
          <p className="text-[10px]">Scan this QR Code at the theatre entry.</p>
        </div>
      </div>
    </div>
  );
};
