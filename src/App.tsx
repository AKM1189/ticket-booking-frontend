import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./App.css";

import { UserRoutes, AdminRoutes } from "@/routeComponents";
import { customMantineTheme, MantineComponentOverrides } from "@/styles";
import AuthRoutes from "./routeComponents/AuthRoutes";
import LoadingProvider from "./LoadingProvider";
import ConfirmModal from "./components/admin/ConfirmModal";

function App() {
  const queryClient = new QueryClient();
  const theme = createTheme({
    ...customMantineTheme,
    ...MantineComponentOverrides,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <LoadingProvider>
          <ConfirmModal />
          <BrowserRouter>
            <UserRoutes />
            <AdminRoutes />
            <AuthRoutes />
          </BrowserRouter>
        </LoadingProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
