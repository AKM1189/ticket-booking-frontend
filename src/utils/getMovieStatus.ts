export const getStatusColor = (status: string) => {
    switch (status) {
        case "Now Showing":
            return "#28a745";
        case "Coming Soon":
            return "#007bff";
        case "Ticket Available":
            return "#c29617";
        case "Ended":
            return "#6c757d";
        default:
            return "#6c757d";
    }
};

export const getBookingStatusColor = (status: string) => {
    switch (status) {
        case "cancelled":
            return "red";
        case "confirmed":
            return "green";
        default:
            return "#6c757d";
    }
};