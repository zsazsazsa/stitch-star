export const getProjectsByUserId = (userId) => {
    return fetch(`http://localhost:8088/projects?userId=${userId}&_embed=sectionProgress`).then(res => res.json())
}

export const getProjectById = (projectId) => {
    return fetch(`http://localhost:8088/projects/${projectId}?_embed=sectionProgress`).then(res => res.json())
}

export const getProjectToUpdate = (projectId) => {
    return fetch(`http://localhost:8088/projects/${projectId}`).then(res => res.json())
}

export const getAllProjects = () => {
    return fetch("http://localhost:8088/projects?_expand=user").then(res => res.json())
}

export const deleteProject = (projectId) => {
    return fetch(`http://localhost:8088/projects/${projectId}`, {
        method: "DELETE"
    })
}

export const saveProject = (projectObj) => {
    return fetch("http://localhost:8088/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectObj)
    })
}

export const updateProject = (projectObj) => {
    return fetch(`http://localhost:8088/projects/${projectObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectObj)
    })
}