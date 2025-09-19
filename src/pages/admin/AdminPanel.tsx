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
import { usePermisson } from "@/hooks/usePermisson";
import { permissionList } from "@/constants/permissons";
import NotAllowed from "./NotAllowed";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTabType>(
    AdminTabType.DASHBOARD,
  );
  const [openMovieModal, setOpenMovieModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const { hasAccess } = usePermisson();

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
        if (!hasAccess(permissionList.readMovie)) return <NotAllowed />;
        return (
          <MovieManagement
            openMovieModal={openMovieModal}
            setOpenMovieModal={setOpenMovieModal}
          />
        );

      case AdminTabType.THEATERS:
        if (!hasAccess(permissionList.readTheatre)) return <NotAllowed />;
        return <TheatreManagement />;

      case AdminTabType.SCHEDULES:
        if (!hasAccess(permissionList.readSchedule)) return <NotAllowed />;
        return (
          <ScheduleManagement
            openScheduleModal={openScheduleModal}
            setOpenScheduleModal={setOpenScheduleModal}
          />
        );

      case AdminTabType.GENRES:
        if (!hasAccess(permissionList.readGenre)) return <NotAllowed />;
        return <GenreManagement />;

      case AdminTabType.CASTS:
        if (!hasAccess(permissionList.readCast)) return <NotAllowed />;
        return <CastManagement />;

      case AdminTabType.BOOKINGS:
        if (!hasAccess(permissionList.readBooking)) return <NotAllowed />;
        return <BookingPage />;

      case AdminTabType.SCREENS:
        if (!hasAccess(permissionList.readScreen)) return <NotAllowed />;
        return <ScreenManagement />;

      case AdminTabType.USERS:
        if (!hasAccess(permissionList.readUser)) return <NotAllowed />;

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
