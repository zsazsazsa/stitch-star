export const getSectionByProjectId = (projectId) => {
    return fetch(`http://localhost:8088/sectionProgress?projectId=${projectId}`).then(res => res.json())
}

export const saveSection = (sectionObj) => {
    return fetch("http://localhost:8088/sectionProgress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sectionObj)
    })
}

export const updateSection = (sectionObj) => {
    return fetch(`http://localhost:8088/sectionProgress/${sectionObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sectionObj)
    })
}