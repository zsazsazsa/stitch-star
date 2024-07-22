export const getProjectsByUserId = (userId) => {
    return fetch(`http://localhost:8088/projects?userId=${userId}&_embed=sectionProgress`).then(res => res.json())
}

export const deleteProject = (projectId) => {
    return fetch(`http://localhost:8088/projects/${projectId}`, {
        method: "DELETE"
    })
}