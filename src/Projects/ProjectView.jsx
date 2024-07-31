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

   const handleReset = (e) => {
    const sectionToUpdate = sections.find(section => section.id === parseInt(e.target.id))
    sectionToUpdate.rowsCompleted = 0
    updateSection(sectionToUpdate).then(() => {
        setTriggerReRender(!triggerReRender)
    })
   }

   const handleSectionComplete = (e) => {
    const sectionToUpdate = sections.find(section => section.id === parseInt(e.target.id))
    sectionToUpdate.complete = true
    updateSection(sectionToUpdate).then(() => {
        setTriggerReRender(!triggerReRender)
    })
   }

    return (
        <>
        <div className="project-view-container">
            <div className="project-header">
                <h2>Project # {project.id}</h2>
                <h1>{project.name}</h1>
            </div>
            <div className="project-link">
                <a href={project.link} target="_blank">Pattern Link</a>
            </div>
            {project.userId === currentUser.id && (
                <>
                    {sections.map(section => {
                        return (
                            <>
                            {!section.complete ? (
                                <div className="section-container">
                                <div className="section-header">
                                    <h3>{section.sectionName}</h3>
                                </div>
                                <div className="row-counter">
                                    <div>{section.rowsCompleted}/{section.totalRows}</div>
                                    {section.rowsCompleted === parseInt(section.totalRows) ? (
                                        <>
                                            <button className="row-btn" onClick={handleReset} id={section.id}>Reset Counter</button>
                                            <button className="row-btn" onClick={handleSectionComplete} id={section.id}>Section Complete</button>
                                        </>
                                    ) : (
                                        <button className="row-btn" onClick={handleRowComplete} id={section.id}>Row Complete</button>
                                    )}
                                    
                                </div>
                            </div>
                            ) : (
                                <div className="section-container-complete">
                                    <h3>Complete*</h3>
                                </div>
                            )}
                                
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