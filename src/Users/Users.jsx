import { useEffect, useState } from "react"
import { getAllProjects } from "../Services/ProjectService"

export const Users = ({currentUser}) => {

    const [userProjects, setUserProjects] = useState([])
    const [filteredProjects, setFilteredProjects] = useState([])

    useEffect(() => {
        getAllProjects().then(data => {
            setUserProjects(data)
        })
    }, [])

    useEffect(() => {
        const otherUsersProjects = userProjects.filter(project => project.userId !== currentUser.id)
        setFilteredProjects(otherUsersProjects)
    }, [currentUser, userProjects])

    return (
        <div className="projects-list">
        {filteredProjects.map(project => {
            return (
                <>
                <div className="project-container" key={project.id}>
                    <div className="project">
                        <div className="project-owner">{project.user.name.toLowerCase()}</div>
                        <div className="project-name">{project.name}</div>
                    </div>
                </div>
                </>
            )
        })}
    </div>
    )
}