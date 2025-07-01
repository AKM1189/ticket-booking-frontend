import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./App.css";

import { AuthRoutes, UserRoutes } from "@/routeComponents";
import { customMantineTheme, MantineComponentOverrides } from "@/styles";

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
        <BrowserRouter>
          <UserRoutes />
          {/* <AuthRoutes /> */}
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
