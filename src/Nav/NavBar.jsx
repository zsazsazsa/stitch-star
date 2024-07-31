import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {

    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link className="navbar-link orange" to="/projects">*Projects</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link pink" to="/favorites">*Favorites</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link green" to="/users">*Users</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link red" to="/profile">*Profile</Link>
            </li>

            {localStorage.getItem("stitch_user") ? (
                <li className="navbar-item">
                    <Link
                    className="navbar-link orange"
                    to=""
                    onClick={() => {
                        localStorage.removeItem("stitch_user")
                        navigate("/", {replace: true})
                    }}
                    >
                        Logout*
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    )
}