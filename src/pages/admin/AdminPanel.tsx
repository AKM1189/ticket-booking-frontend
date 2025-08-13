import { useState } from "react";
import {
  AdminLayout,
  AdminDashboard,
  MovieManagement,
  TheatreManagement,
  ScheduleManagement,
  GenreManagement,
  CastManagement,
  BookingManagement,
  ScreenManagement,
  UserManagement,
} from "@/components/admin";
import { AdminTabType } from "@/types/AdminTypes";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTabType>(
    AdminTabType.DASHBOARD,
  );

  const renderContent = () => {
    switch (activeTab) {
      case AdminTabType.DASHBOARD:
        return <AdminDashboard />;
      case AdminTabType.MOVIES:
        return <MovieManagement />;
      case AdminTabType.THEATERS:
        return <TheatreManagement />;
      case AdminTabType.SCHEDULES:
        return <ScheduleManagement />;
      case AdminTabType.GENRES:
        return <GenreManagement />;
      case AdminTabType.CASTS:
        return <CastManagement />;
      case AdminTabType.BOOKINGS:
        return <BookingManagement />;
      case AdminTabType.SCREENS:
        return <ScreenManagement />;
      case AdminTabType.USERS:
        return <UserManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPanel;
