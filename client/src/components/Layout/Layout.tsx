import { RouterProvider } from "react-router-dom"
import { router } from "../../Routes/Routes"
import "./layout.css"

export const Layout = () => {
    return (
    <>
        <div className="bodyContainer">
            <RouterProvider router={router} />
        </div>
    </>
    )
}