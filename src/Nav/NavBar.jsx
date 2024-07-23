import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {

    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link className="navbar-link" to="/projects">projects</Link>
            </li>
            {/* <li className="navbar-item">
                <Link className="navbar-link" to="/favorites">favorites</Link>
            </li> */}
            <li className="navbar-item">
                <Link className="navbar-link" to="/users">users</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to="/profile">profile</Link>
            </li>

            {localStorage.getItem("stitch_user") ? (
                <li className="navbar-item">
                    <Link
                    className="navbar-link"
                    to=""
                    onClick={() => {
                        localStorage.removeItem("stitch_user")
                        navigate("/", {replace: true})
                    }}
                    >
                        logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    )
}