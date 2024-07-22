import { useEffect, useState } from "react"
import "./Projects.css"
import { deleteProject, getProjectsByUserId } from "../Services/ProjectService"
import { useNavigate } from "react-router-dom"

export const Projects = ({ currentUser }) => {

    const navigate = useNavigate()

    const [projects, setProjects] = useState([])

    const render = () => {
        getProjectsByUserId(currentUser.id).then((data) => {
            setProjects(data)
        })
    }

    useEffect(() => {
       render()
    }, [currentUser])

    const calculateSectionProgress = (rowsCompleted, totalRows) => {
        return Math.floor((rowsCompleted/totalRows)*100)
    }

    const handleDelete = (e) => {
        const projectToDelete = projects.find(project => project.id === parseInt(e.target.id))
        deleteProject(projectToDelete.id).then(() => {
            render()
        })
        
    }

    return (
        <>
        <div className="button-container">
            <button className="new-project-btn" onClick={()=>{
                navigate("/projects/new")
            }}>new project</button>
        </div>
        <div className="projects-list">
            {projects.map(project => {
                return (
                    <>
                    <div className="project-container" key={project.id}>
                        <div className="project">
                            <div className="project-number">project #{project.id}</div>
                            <div className="project-name">{project.name}</div>
                            <div className="project-completion">{calculateSectionProgress(project.sectionProgress[0].rowsCompleted, project.sectionProgress[0].totalRows)}%</div>
                        </div>
                        <div className="project-btns">
                            <button className="edit-btn" onClick={() => {
                                navigate("/projects/edit")
                            }}>edit</button>
                            <button id={project.id}className="delete-btn" onClick={handleDelete}>delete</button>
                        </div>
                    </div>
                    </>
                )
            })}
        </div>
        </>
    )
}