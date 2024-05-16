import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Navbar } from "../NavBar/Navbar";
import { HomePage } from "../HomePage/HomePage";
import { AddVacation } from "../AddVacation/AddVacation";
import { Sign } from "../SigninUp/Sign";

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
