import { downloadTicket } from "@/api/function/user/bookingApi";
import { useMutation } from "@tanstack/react-query";
import { getErrorNoti, getSuccessNoti } from "@/utils/showResponseNoti";

export const useDownloadTicketMutation = () => {
  return useMutation({
    mutationFn: downloadTicket,
    onSuccess: (data, bookingId) => {
      // Create blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ticket-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      getSuccessNoti("Success", { status: 200, message: "Ticket downloaded successfully" }, "Ticket downloaded successfully");
    },
    onError: (error: any) => {
      getErrorNoti("Error", error, "Failed to download ticket");
    },
  });
};