import { MantineProvider } from "@mantine/core";
import { AdminPanel } from "@/pages";
import "@mantine/core/styles.css";

/**
 * Demo component to showcase the Admin Dashboard
 * This can be used as a standalone component or integrated into your routing
 */
const AdminDashboardDemo = () => {
  return (
    <MantineProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminPanel />
      </div>
    </MantineProvider>
  );
};

export default AdminDashboardDemo;
