import { useEffect, useState } from "react"
import { getUserById } from "../Services/UserService"
import "./Profile.css"
import { useNavigate } from "react-router-dom"

export const Profile = ({currentUser}) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    useEffect(() => {
        if(currentUser) {
            getUserById(currentUser.id).then(data => {
                setUser(data)
            })
        }
    }, [currentUser])

    return (
        <>
            <div className="profile-container">
                <div key={user.id} className="profile-info">
                    <div className="profile-name">Name: {user.name}</div>
                    <div className="profile-email">Email: {user.email}</div>
                    <div className="profile-projects"># of Projects: {user.projects?.length}</div>
                </div>
            </div>
            <div className="btn-container">
                <div className="edit-btn" onClick={() => {
                    navigate("/profile/edit")
                }}>Edit</div>
            </div>
            
            
        </>
    )
}