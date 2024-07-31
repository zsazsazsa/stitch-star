import { useEffect, useState } from "react"
import { saveSection } from "../Services/SectionService"
import { useNavigate } from "react-router-dom"
import { getAllProjects } from "../Services/ProjectService"


export const NewSection = ({newProject}) => {

    const navigate = useNavigate()

    const [projects, setProjects] = useState([])
    const [projectToUpdate, setProjectToUpdate] = useState({})

    useEffect(() => {
        getAllProjects().then(data => {
            setProjects(data)
        })
    }, [])

    useEffect(() => {
        const foundProject = projects[projects.length - 1]
        setProjectToUpdate(foundProject)
    }, [newProject, projects])

    const initialSectionState = {
        projectId: 0,
        sectionName: "",
        totalRows: 0, 
        rowsCompleted: 0, 
        complete: false
    }

    const [newSection, setNewSection] = useState(initialSectionState)


    const handleInputChange = (e) => {
        const copy = {...newSection}
        copy[e.target.name] = e.target.value 
        setNewSection(copy)
    }

    const handleSectionSave = (e) => {
        e.preventDefault()
        if (newSection.sectionName && newSection.totalRows) {
            const copy = {...newSection}
            copy.projectId = projectToUpdate.id

            saveSection(copy).then(() => {
            navigate("/projects")
        })
        } else {
            alert("please fill out all fields")
        }
        
    }

    const handleNewSection = (e) => {
        e.preventDefault()
        if (newSection.sectionName && newSection.totalRows) {
            const copy = {...newSection}
            copy.projectId = projectToUpdate.id

            saveSection(copy).then(() => {
                alert("section saved. add another. click save on final section.")
                setNewSection(initialSectionState)
            })
            
        } else {
            alert("please fill out all fields")
        }
        
    }

    return (
        <>
        <div className="section-form-container">
            <fieldset className="section-name">
                <label>section name:</label>
                <input 
                    type="text"
                    onChange={handleInputChange} 
                    name="sectionName"
                    value={newSection.sectionName}/>
            </fieldset>
            <fieldset>
                <label>number of rows:</label>
                <input 
                type="number" 
                placeholder="enter number"
                name="totalRows"
                onChange={handleInputChange}
                value={newSection.totalRows}/>
            </fieldset>
            <div className="button-container">
                <button 
                    className="section-add-btn"
                    onClick={handleNewSection}>add another</button>
                <button 
                    className="save-btn"
                    onClick={handleSectionSave}>save</button>
            </div>
        </div>
        
        </>
    )
}