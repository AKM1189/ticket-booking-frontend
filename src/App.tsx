import { BrowserRouter, NavLink } from "react-router";
import "./App.css";
import AuthRoutes from "./routes/AuthRoutes";
import { createTheme, MantineProvider } from "@mantine/core";

function App() {
  // const theme = createTheme({
  //   colors: {
  //     default: [
  //       "#fff9e5",
  //       "#ffe400",
  //       "#e6cc00",
  //       "#b3a300",
  //       "#8c7a00",
  //       "#6d5a00",
  //       "#4f4200",
  //       "#2f2a00",
  //       "#1a1700",
  //       "#0a0c00",
  //     ],
  //   },
  //   primaryColor: "default",
  //   components: {
  //     // Customizing specific components
  //     Checkbox: {
  //       styles: (theme: any) => ({
  //         icon: {
  //           color: theme.colors.default[5], // Change the icon color (checkmark)
  //         },
  //         input: {
  //           // borderColor: theme.colors.default[5], // Change the border color
  //           border: "1px solid green",
  //         },
  //       }),
  //     },
  //     Button: {
  //       styles: (theme: any) => ({
  //         root: {
  //           backgroundColor: theme.colors.default[5], // Default button color
  //           "&:hover": {
  //             backgroundColor: theme.colors.default[6], // Hover color
  //           },
  //         },
  //       }),
  //     },
  //   },
  // });
  return (
    <MantineProvider>
      <BrowserRouter>
        <AuthRoutes />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
