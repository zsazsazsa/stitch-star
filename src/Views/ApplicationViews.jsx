import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../Nav/NavBar"
import { Projects } from "../Projects/Projects"
import { Favorites } from "../Favorites/Favorites"
import { Users } from "../Users/Users"
import { Profile } from "../Profile/Profile"
import { EditProfile } from "../Profile/EditProfile"

export const ApplicationViews = () => {

    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localStitchUser = localStorage.getItem("stitch_user")
        const stitchUserObj = JSON.parse(localStitchUser)
        setCurrentUser(stitchUserObj)
    }, [])

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
                <Route path="projects">
                    <Route index element={<Projects currentUser={currentUser}/>} />
                    <Route path="new" element={<>NEW</>} />
                    <Route path="edit" element={<>EDIT</>} />
                </Route>
                <Route path="favorites" element={<Favorites />} />
                <Route path="users" element={<Users currentUser={currentUser}/>} />
                <Route path="profile">
                    <Route index element={<Profile currentUser={currentUser}/>} />
                    <Route path="edit" element={<EditProfile currentUser={currentUser}/>} />
                </Route>
            </Route>
        </Routes>
    )
}