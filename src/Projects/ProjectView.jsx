import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProjectById } from "../Services/ProjectService"
import "./Projects.css"
import { getSectionByProjectId, updateSection } from "../Services/SectionService"

export const ProjectView = ({currentUser}) => {

    const navigate = useNavigate()

    const [project, setProject] = useState({})
    const [sections, setSections] = useState([])
    const [triggerReRender, setTriggerReRender] = useState(false)
    const { projectId } = useParams()

    useEffect(() => {
        getProjectById(projectId).then(data => {
           setProject(data)
        })
    }, [projectId, triggerReRender])

   useEffect(() => {
    getSectionByProjectId(projectId).then(data => {
        setSections(data)
    })
   }, [projectId, triggerReRender])

   const handleRowComplete = (e) => {
    const sectionToUpdate = sections.find(section => section.id === parseInt(e.target.id))
    sectionToUpdate.rowsCompleted++
    updateSection(sectionToUpdate).then(() => {
        setTriggerReRender(!triggerReRender)
    })
   }

    return (
        <>
        <div className="project-view-container">
            <div className="project-header">
                <h2>project # {project.id}</h2>
                <h1>{project.name}</h1>
            </div>
            <div className="project-link">
                <a href={project.link} target="_blank">pattern link</a>
            </div>
            {project.userId === currentUser.id && (
                <>
                    {sections.map(section => {
                        return (
                            <>
                                <div className="section-container">
                                    <div className="section-header">
                                        <h3>{section.sectionName}</h3>
                                    </div>
                                    <div className="row-counter">
                                        <div>{section.rowsCompleted}/{section.totalRows}</div>
                                        <button className="row-btn" onClick={handleRowComplete} id={section.id}>row complete</button>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                    <div className="btn-container">
                        <button className="edit-btn" onClick={() => {navigate(`/projects/${project.id}/edit`)}}>edit project</button>
                    </div>
                </>
            )}
        </div>
        </>
    )
}