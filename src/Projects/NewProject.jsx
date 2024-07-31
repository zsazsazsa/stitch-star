import {  useState } from "react"
import { CategorySelector } from "../Categories/CategorySelector"
import "./Projects.css"
import {  saveProject } from "../Services/ProjectService"
import { NewSectionNew } from "../Sections/NewSectionNew"


export const NewProject = ({currentUser}) => {


    const [newProject, setNewProject] = useState({
        userId: currentUser?.id,
        name: "",
        categoryId: 0,
        link: "",
        img: ""
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
            alert("Please Fill Out All Fields")
        }
    }

    return (
        <>
        <div className="form-container">
            <fieldset className="project-name-input">
                <label>Project Name:</label>
                <input 
                    type="text"
                    onChange={handleInputChange}
                    name="name" />
            </fieldset>
            <fieldset className="category-selector">
                <label>Select Category:</label>
                <CategorySelector handleCategory={handleCategory}/>
            </fieldset>
            <fieldset className="project-link-input">
                <label>Project Link:</label>
                <input 
                    type="text"
                    onChange={handleInputChange}
                    name="link" />
            </fieldset>
            <fieldset className="project-img-input">
                <label>Project Image:</label>
                <input 
                    type="text"
                    onChange={handleInputChange}
                    name="img" />
            </fieldset>
            <fieldset className="form-save">
                {!addNewSection && (<button className="save-btn" onClick={handleSave}>Add Section</button>)}
            </fieldset>
        </div>
        
        {addNewSection && (
           <NewSectionNew newProject={newProject}/>
        )}
        </>
    )
}