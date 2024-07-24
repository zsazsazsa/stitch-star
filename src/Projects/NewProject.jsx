import {  useState } from "react"
import { CategorySelector } from "../Categories/CategorySelector"
import "./Projects.css"
import {  saveProject } from "../Services/ProjectService"
import { NewSection } from "../Sections/NewSection"


export const NewProject = ({currentUser}) => {


    const [newProject, setNewProject] = useState({
        userId: currentUser?.id,
        name: "",
        categoryId: 0,
        link: ""
    })

    const [newSection, setNewSection] = useState({
        projectId: 0,
        totalRows: 0,
        rowsCompleted: 0, 
        complete: false
    })

    const [addNewSection, setAddNewSection] = useState(false)

    const handleInputChange = (e) => {
        const projectCopy = {...newProject}
        projectCopy[e.target.name] = e.target.value
        setNewProject(projectCopy)
    }

    const handleCategory = (e) => {
         const projectCopy = {...newProject}
         projectCopy.categoryId = parseInt(e.target.value)
         setNewProject(projectCopy)
    }

    const handleSave = (e) => {
        e.preventDefault()
        if (newProject.name && newProject.categoryId && newProject.link && newProject.userId) {
            saveProject(newProject)
            setAddNewSection(true)
        } else {
            alert("please fill out all fields")
        }
    }

    return (
        <>
        <div className="form-container">
            <fieldset className="project-name-input">
                <label>project name:</label>
                <input 
                    type="text"
                    onChange={handleInputChange}
                    name="name" />
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
                    name="link" />
            </fieldset>
            <fieldset className="form-save">
                {!addNewSection && (<button className="save-btn" onClick={handleSave}>add section</button>)}
            </fieldset>
        </div>

        {addNewSection && (
           <NewSection newProject={newProject}/>
        )}
        </>
    )
}