export const getAllLikes = () => {
    return fetch("http://localhost:8088/projectLikes").then(res => res.json())
}

export const getLikesByUser = (userId) => {
    return fetch(`http://localhost:8088/projectLikes?userId=${userId}&_expand=project`).then(res => res.json())
}

export const saveLike = (likeObj) => {
    return fetch("http://localhost:8088/projectLikes", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likeObj)
    })
}

export const deleteLike = (likeObj) => {
    return fetch(`http://localhost:8088/projectLikes/${likeObj.id}`, {
        method: "DELETE"
    })
}