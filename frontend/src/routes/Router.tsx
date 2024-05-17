import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Sign } from "../components/SigninUp/Sign";
import { HomePage } from "../components/HomePage";
import { AddVacation } from "../components/Vacations/AddVacation";
import { Navbar } from "../components/Navbar";
import Chart from "../components/Vacations/Chart";
import { EditVacation } from "../components/Vacations/EditVacation";

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
      {
        path: "editvacation",
        element: <EditVacation />,
      },
      {
        path: "vacationchart",
        element: <Chart />,
      },
    ],
  },
]);

export default router;
