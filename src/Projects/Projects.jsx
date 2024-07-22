import { useEffect, useState } from "react"
import "./Projects.css"
import { getProjectsByUserId } from "../Services/ProjectService"

export const Projects = ({ currentUser }) => {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        getProjectsByUserId(currentUser.id).then((data) => {
            setProjects(data)
        })
    }, [currentUser])

    const calculateSectionProgress = (rowsCompleted, totalRows) => {
        return Math.floor((rowsCompleted/totalRows)*100)
    }

    return (
        <div className="projects-list">
            {projects.map(project => {
                return (
                    <div className="project" key={project.id}>
                        <div className="project-number">project #{project.id}</div>
                        <div className="project-name">{project.name}</div>
                        <div className="project-completion">{calculateSectionProgress(project.sectionProgress[0].rowsCompleted, project.sectionProgress[0].totalRows)}%</div>
                    </div>
                )
            })}
        </div>
    )
}