import { Outlet, createBrowserRouter } from "react-router-dom";
import { NavBar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { Signin } from "../components/signin-area/Signin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <NavBar />
                    <Outlet />
                    <Footer />
                </div>
            </>
        ),
        children: [
            {
                path: "/books",
                element: <h1>Books</h1>,
            },
            {
                path: "/categories",
                element: <h1>categories</h1>,
            },
            {
                path: "/authors",
                element: <h1>authors</h1>,
            },
            {
                path: "/signin",
                element: <Signin />,
            },
        ],
    },
]);