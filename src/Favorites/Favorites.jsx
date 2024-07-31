import { useEffect, useState } from "react"
import { deleteLike, getAllLikes, getLikesByUser } from "../Services/LikeService"
import { Link } from "react-router-dom"

export const Favorites = ({currentUser}) => {

    const [likes, setLikes] = useState([])
    const [triggerReRender, setTriggerReRender] = useState(false)

    useEffect(() => {
        getLikesByUser(currentUser.id).then(data => {
            setLikes(data)
        })
    }, [currentUser, triggerReRender])

    
    const handleUnLike = (e) => {
        const likeToDelete = likes.find(like => like.id === parseInt(e.target.id))
        deleteLike(likeToDelete).then(() => {
            setTriggerReRender(!triggerReRender)
        })
    }

    return (
        <div className="like-list">
          {likes.map((like) => {
            return (
              <div className="project-container" key={like.project.id}>
                <Link to={`/projects/${like.project.id}`} className="project-link">
                  <div className="project">
                    <div className="project-name">{like.project.name}</div>
                    <div className="image">
                      <img src={like.project.img} alt={like.project.name} />
                    </div>
                  </div>
                </Link>
                <div className="like-btn-container">
                    <button className="like-btn" id={like.id} onClick={handleUnLike}>
                      Unlike
                    </button>
                </div>
              </div>
            );
          })}
        </div>
      );
}