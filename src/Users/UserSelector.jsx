import { useEffect, useState } from "react"
import { getAllUsers } from "../Services/UserService"

export const UserSelector = ({handleUserChoice, currentUser}) => {
    const [users, setUsers] = useState([])
    const [otherUsers, setOtherUsers] = useState([])

    useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data)
        })
    }, [])

    useEffect(() => {
        const usersForList = users.filter(user => user.id !== currentUser.id)
        setOtherUsers(usersForList)
    }, [currentUser, users])

    return (
        <>
        <select onChange={handleUserChoice}>
            <option disabled selected>-</option>
            {otherUsers.map(user => {
                return (
                    <>
                    <option 
                        key={user.id}
                        value={user.id}>{user.name}</option>
                    </>
                )
            })}
        </select>
        </>
    )
}
