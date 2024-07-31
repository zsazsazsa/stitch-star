import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProject, getAllProjects, getProjectToUpdate, updateProject } from "../Services/ProjectService"
import { deleteSection, getSectionByProjectId, updateSection } from "../Services/SectionService"
import { CategorySelector } from "../Categories/CategorySelector"
import { NewSection } from "../Sections/NewSection"

export const EditProject = () => {

    const navigate = useNavigate()

    const { projectId } = useParams()

    const [project, setProject] = useState({})
    const [sections, setSections] = useState([])
    const [projects, setProjects] = useState([])
    const [triggerReRender, setTriggerReRender] = useState(false)
    const [addNewSection, setAddNewSection] = useState(false)

    useEffect(() => {
        getProjectToUpdate(projectId).then(data => {
            setProject(data)
        })
    }, [projectId])

    useEffect(() => {
        getSectionByProjectId(projectId).then(data => {
            setSections(data)
        })
    }, [projectId, triggerReRender])

    useEffect(() => {
        getAllProjects().then(data => {
            setProjects(data)
        })
    }, [])

    
    const handleInputChange = (e) => {
        const projectCopy = {...project}
        projectCopy[e.target.name] = e.target.value
        setProject(projectCopy)
    }

    const handleCategory = (e) => {
        const projectCopy = {...project}
        projectCopy.categoryId = parseInt(e.target.value)
        setProject(projectCopy)
   }

    const handleProjectUpdate = (e) => {
        e.preventDefault()

        updateProject(project).then(() => {
            navigate(`/projects/${project.id}`)
        })

    }

    const handleSectionInputChange = (e, index) => {
        const sectionsCopy = [...sections]
        sectionsCopy[index][e.target.name] = e.target.value
        setSections(sectionsCopy)
    }

    const handleSectionUpdate = (index) => {

        const sectionToUpdate = sections[index]
        sectionToUpdate.complete = false
        updateSection(sectionToUpdate).then(() => {
            navigate(`/projects/${project.id}`)
        })
    }

    const handleDelete = (e) => {
        const projectToDelete = projects.find(project => project.id === parseInt(e.target.id));
        deleteProject(projectToDelete.id).then(() => {
            navigate("/projects")
        });
    };

    const handleSectionDelete = (e) => {
        const sectionToDelete = sections.find(section => section.id === parseInt(e.target.id))
        deleteSection(sectionToDelete.id).then(() => {
            setTriggerReRender(!triggerReRender)
        })
    }
    
    return (
        <>
          <div className="form-container">
            <fieldset className="project-name-input">
                <label>Project Name:</label>
                <input 
                    type="text"
                    onChange={handleInputChange}
                    name="name"
                    value={project.name} />
            </fieldset>
            <fieldset className="category-selector">
                <label>Select Category:</label>
                <CategorySelector handleCategory={handleCategory} initialValue={project.categoryId}/>
            </fieldset>
            <fieldset className="project-link-input">
                <label>Project Link:</label>
                <input 
                    type="text"
                    onChange={handleInputChange}
                    name="link"
                    value={project.link} />
            </fieldset>
            <fieldset className="project-img-input">
                <label>Project Image:</label>
                <input 
                    type="text"
                    onChange={handleInputChange}
                    name="img"
                    value={project.img} />
            </fieldset>
            <fieldset className="form-save">
                <button className="save-btn" onClick={handleProjectUpdate}>Update Project Details</button>
                <button className="delete-btn" id={project.id} onClick={handleDelete}>Delete Project</button>
            </fieldset>

        </div>  
        <div className="form-container">
            {sections.map((section, index) => {
                return (
                    <>
                        <fieldset className="section-name-input">
                            <label>Section Name:</label>
                            <input 
                                type="text"
                                onChange={(e) => handleSectionInputChange(e, index)}
                                name="sectionName"
                                value={section.sectionName} />
                        </fieldset>
                        <fieldset className="section-rows">
                            <label>Rows Completed:</label>
                            <input
                                type="number"
                                onChange={(e) => handleSectionInputChange(e, index)}
                                name="rowsCompleted"
                                value={section.rowsCompleted} />
                        </fieldset>
                        <fieldset className="section-total">
                            <label>Total Rows:</label>
                            <input
                                type="number"
                                onChange={(e) => handleSectionInputChange(e, index)}
                                name="totalRows"
                                value={section.totalRows} />
                        </fieldset>
                        <fieldset className="form-save">
                            <button className="save-btn" onClick={() => handleSectionUpdate(index)}>Update Section Details</button>
                            <button className="delete-btn" onClick={handleSectionDelete} id={section.id}>Delete Section</button>
                        </fieldset>
                    </>
                )
            })}
        </div>
        <div className="button-container">
            <button className="add-section-btn" onClick={() => {
                setAddNewSection(true)
            }}>Add Section</button>
        </div>
        {addNewSection && (
           <NewSection newProject={project}/>
        )}
        </>
    )
}