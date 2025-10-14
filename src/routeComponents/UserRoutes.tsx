import { Route, Routes } from "react-router-dom";
import UserLayout from "@/components/layout/UserLayout";
import { routes } from "@/routes";
import { Home, About, Movies } from "@/pages";
import MovieDetail from "@/pages/user/MovieDetail";
import TicketPlan from "@/pages/user/TicketPlan";
import Contact from "@/pages/user/Contact";
import TermsOfUse from "@/pages/user/TermsOfUse";
import PrivacyPolicy from "@/pages/user/PrivacyPolicy";
import FAQ from "@/pages/user/FAQ";
import AdminAccessDemo from "@/components/AdminAccessDemo";
import ProtectedRoute from "@/components/protectedRoutes/ProtectedRoute";
import { Role } from "@/types/AuthType";
import Booking from "@/pages/user/Booking";
import BookingHistory from "@/pages/user/BookingHistory";
import MovieTicket from "@/pages/user/MovieTicket";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={[Role.user]} />}>
        <Route path={routes.user.home} element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path={routes.user.about} element={<About />} />
          <Route path={routes.user.contact} element={<Contact />} />
          <Route path={routes.user.termsOfUse} element={<TermsOfUse />} />
          <Route path={routes.user.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={routes.user.faq} element={<FAQ />} />
          <Route path={routes.user.movies}>
            <Route index element={<Movies />} />
            <Route path="sortBy/:type?" element={<Movies />} />
            <Route path=":id" element={<MovieDetail />} />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={[Role.user, Role.admin]} />}
          >
            <Route path={routes.user.ticketPlan} element={<TicketPlan />} />
            <Route path={routes.user.booking + "/:id"} element={<Booking />} />
            <Route path={routes.user.bookingHistory} element={<BookingHistory />} />
            <Route path={routes.user.ticket} element={<MovieTicket />} />
            <Route path={routes.admin.demo} element={<AdminAccessDemo />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
