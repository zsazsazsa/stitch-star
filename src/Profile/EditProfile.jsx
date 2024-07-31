import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../Services/UserService"
import "./Profile.css"
import { useNavigate } from "react-router-dom"

export const EditProfile = ({currentUser}) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    useEffect(() => {
        getUserById(currentUser.id).then(data => {
            setUser(data)
        })
    }, [currentUser])

    const handleSave = (e) => {
        e.preventDefault
        
        const editedUser = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        updateUser(editedUser).then(() => {
            navigate("/profile")
        })
    }

    const handleInputChange = (e) => {
        const userCopy = {...user}
        userCopy[e.target.name] = e.target.value
        setUser(userCopy)
    }

    return (
        <>
        <div className="profile-edit-container">
            <fieldset>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={user.name} 
                    onChange={handleInputChange}
                    name="name"/>
            </fieldset>
            <fieldset>
                <label>Email:</label>
                <input 
                    type="text" 
                    value={user.email} 
                    onChange={handleInputChange}
                    name="email"/>
            </fieldset>
        </div>
        <div className="btn-container">
                <div className="save-btn" onClick={handleSave}>Save</div>
            </div>
        </>
    )
}