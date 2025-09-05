import { useState } from "react";
import {
  AdminLayout,
  AdminDashboard,
  MovieManagement,
  TheatreManagement,
  ScheduleManagement,
  GenreManagement,
  CastManagement,
  ScreenManagement,
  UserManagement,
} from "@/components/admin";
import { AdminTabType } from "@/types/AdminTypes";
import BookingPage from "@/components/admin/bookings/BookingPage";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTabType>(
    AdminTabType.DASHBOARD,
  );
  const [openMovieModal, setOpenMovieModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case AdminTabType.DASHBOARD:
        return (
          <AdminDashboard
            setActiveTab={setActiveTab}
            setOpenMovieModal={setOpenMovieModal}
            setOpenScheduleModal={setOpenScheduleModal}
          />
        );
      case AdminTabType.MOVIES:
        return (
          <MovieManagement
            openMovieModal={openMovieModal}
            setOpenMovieModal={setOpenMovieModal}
          />
        );
      case AdminTabType.THEATERS:
        return <TheatreManagement />;
      case AdminTabType.SCHEDULES:
        return (
          <ScheduleManagement
            openScheduleModal={openScheduleModal}
            setOpenScheduleModal={setOpenScheduleModal}
          />
        );
      case AdminTabType.GENRES:
        return <GenreManagement />;
      case AdminTabType.CASTS:
        return <CastManagement />;
      case AdminTabType.BOOKINGS:
        return <BookingPage />;
      // case AdminTabType.SEATTYPE:
      //   return <SeatTypeManagement />;
      case AdminTabType.SCREENS:
        return <ScreenManagement />;
      case AdminTabType.USERS:
        return <UserManagement />;
      default:
        return (
          <AdminDashboard
            setActiveTab={setActiveTab}
            setOpenMovieModal={setOpenMovieModal}
            setOpenScheduleModal={setOpenScheduleModal}
          />
        );
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPanel;
