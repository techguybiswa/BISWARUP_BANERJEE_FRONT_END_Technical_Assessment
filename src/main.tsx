import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import theme from "./utils/theme.ts";
import BookAppointment from "./pages/BookAppointment.tsx";
import { ThemeProvider } from "@mui/material";
import BookingSuccess from "./pages/BookingSuccess.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/doctors" replace={true} />,
  },
  {
    path: "/doctors",
    element: <App />,
  },
  {
    path: "/doctors/:id/book",
    element: <BookAppointment />,
  },
  {
    path: "/booking-success/:bookingId",
    element: <BookingSuccess />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
