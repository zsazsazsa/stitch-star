import { useEffect, useState } from "react"
import { deleteLike, getLikesByUser } from "../Services/LikeService"
import { Link } from "react-router-dom"
import { CategorySelector } from "../Categories/CategorySelector"

export const Favorites = ({currentUser}) => {

    const [likes, setLikes] = useState([])
    const [triggerReRender, setTriggerReRender] = useState(false)
    const [category, setCategory] = useState(0)
    const [filteredProjects, setFilteredProjects] = useState([])

    useEffect(() => {
        getLikesByUser(currentUser.id).then(data => {
            setLikes(data)
        })
    }, [currentUser, triggerReRender])

    useEffect(() => {
      setFilteredProjects(likes)
  }, [likes])


    
    const handleUnLike = (e) => {
        const likeToDelete = likes.find(like => like.id === parseInt(e.target.id))
        deleteLike(likeToDelete).then(() => {
            setTriggerReRender(!triggerReRender)
        })
    }

    const handleCategory = (e) => {
      const selectedCategory = parseInt(e.target.value);
      setCategory(selectedCategory);
      if (selectedCategory) {
          const filter = likes.filter(like => like.project.categoryId === selectedCategory);
          setFilteredProjects(filter);
      } else {
          setFilteredProjects(likes);
      }
  };

  const handleShowAll = () => {
    setFilteredProjects(likes)
}

    return (
      <>
      <div className="selector-container">
                <div>
                    <p>Select a Category:</p><CategorySelector handleCategory={handleCategory}/>
                </div>
                <button className="show-all-btn" onClick={handleShowAll}>Show All</button>
            </div>
        <div className="like-list">
          {filteredProjects.map((like) => {
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
        </>
      );
}