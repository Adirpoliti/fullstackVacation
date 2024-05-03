import { useNavigate } from "react-router-dom"
import "./navBar.css"



export const NavBar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(`/${path}`)
    }

    return (
        <div className="container">
            <h1 className="title">Books Store</h1>
            <span onClick={() => handleNavigation("")} className="linkSpan" >Home</span>
            <span onClick={() => handleNavigation("books")} className="linkSpan">Books</span>
            <span onClick={() => handleNavigation("authors")} className="linkSpan">Authors</span>
            <span onClick={() => handleNavigation("categories")} className="linkSpan">Categories</span>
            <span onClick={() => handleNavigation("signin")} className="signin linkSpan">Signin</span>
        </div>
    )
}