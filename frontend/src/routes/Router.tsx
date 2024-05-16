import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Sign } from "../components/SigninUp/Sign";
import { HomePage } from "../components/HomePage/HomePage";
import { AddVacation } from "../components/AddVacation/AddVacation";
import { Navbar } from "../components/NavBar/Navbar";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sign />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "newvacation",
        element: <AddVacation />,
      },
      // Uncomment and add other routes as needed
      // {
      //   path: "editvacation",
      //   element: <AddVacation />,
      // },
      // {
      //   path: "vacationchart",
      //   element: <Chart />,
      // },
    ],
  },
]);

export default router;
