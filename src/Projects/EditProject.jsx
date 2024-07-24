import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProjectToUpdate, updateProject } from "../Services/ProjectService"
import { getSectionByProjectId, updateSection } from "../Services/SectionService"
import { CategorySelector } from "../Categories/CategorySelector"

export const EditProject = () => {

    const navigate = useNavigate()

    const { projectId } = useParams()

    const [project, setProject] = useState({})
    const [sections, setSections] = useState([])

    useEffect(() => {
        getProjectToUpdate(projectId).then(data => {
            setProject(data)
        })
    }, [projectId])

    useEffect(() => {
        getSectionByProjectId(projectId).then(data => {
            setSections(data)
        })
    }, [projectId])

    
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
        updateSection(sectionToUpdate).then(() => {
            navigate(`/projects/${project.id}`)
        })
    }
    
    return (
        <>
          <div className="form-container">
            <fieldset className="project-name-input">
                <label>project name:</label>
                <input 
                    type="text"
                    onChange={handleInputChange}
                    name="name"
                    value={project.name} />
            </fieldset>
            <fieldset className="category-selector">
                <label>select category:</label>
                <CategorySelector handleCategory={handleCategory}/>
            </fieldset>
            <fieldset className="project-link-input">
                <label>project link:</label>
                <input 
                    type="text"
                    onChange={handleInputChange}
                    name="link"
                    value={project.link} />
            </fieldset>
            <fieldset className="form-save">
                <button className="save-btn" onClick={handleProjectUpdate}>update project details</button>
            </fieldset>
        </div>  
        <div className="form-container">
            {sections.map((section, index) => {
                return (
                    <>
                        <fieldset className="section-name-input">
                            <label>section name:</label>
                            <input 
                                type="text"
                                onChange={(e) => handleSectionInputChange(e, index)}
                                name="sectionName"
                                value={section.sectionName} />
                        </fieldset>
                        <fieldset className="section-rows">
                            <label>rows completed:</label>
                            <input
                                type="number"
                                onChange={(e) => handleSectionInputChange(e, index)}
                                name="rowsCompleted"
                                value={section.rowsCompleted} />
                        </fieldset>
                        <fieldset className="section-total">
                            <label>total rows:</label>
                            <input
                                type="number"
                                onChange={(e) => handleSectionInputChange(e, index)}
                                name="totalRows"
                                value={section.totalRows} />
                        </fieldset>
                        <fieldset className="form-save">
                            <button className="save-btn" onClick={() => handleSectionUpdate(index)}>update section details</button>
                        </fieldset>
                    </>
                )
            })}
        </div>
        </>
    )
}