import { useEffect, useState } from "react";
import { getAllProjects } from "../Services/ProjectService";
import { Link } from "react-router-dom";
import { getAllLikes, saveLike } from "../Services/LikeService";
import "./Users.css"
import { UserSelector } from "./UserSelector";

export const Users = ({ currentUser }) => {
  const [userProjects, setUserProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [triggerReRender, setTriggerReRender] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllProjects().then((data) => {
      setUserProjects(data);
    });
  }, []);

  useEffect(() => {
    const otherUsersProjects = userProjects.filter(
      (project) => project.userId !== currentUser.id
    );
    setFilteredProjects(otherUsersProjects);
  }, [currentUser, userProjects]);

  useEffect(() => {
    getAllLikes().then((data) => {
      setAllLikes(data);
    });
  }, [triggerReRender]);

  const handleLike =  (e) => {
    const newLike = {
      userId: currentUser.id,
      projectId: parseInt(e.target.id),
    };

    saveLike(newLike);
    setAllLikes([...allLikes, newLike]);
    setTriggerReRender(!triggerReRender)
  };

  const handleUserChoice = (e) => {
    const selectedUser = parseInt(e.target.value);
    setUsers(selectedUser);
    if (selectedUser) {
        const filter = userProjects.filter(project => project.userId === selectedUser);
        setFilteredProjects(filter);
    } else {
      const otherUsersProjects = userProjects.filter(
        (project) => project.userId !== currentUser.id
      );
      setFilteredProjects(otherUsersProjects);
    }
};

const handleShowAll = () => {
  const otherUsersProjects = userProjects.filter(
    (project) => project.userId !== currentUser.id
  );
  setFilteredProjects(otherUsersProjects);
}

  return (
    <>
    <div className="selector-container">
                <div>
                    <p>Select a User:</p><UserSelector currentUser={currentUser} handleUserChoice={handleUserChoice}/>
                </div>
                <button className="show-all-btn" onClick={handleShowAll}>Show All</button>
            </div>

    <div className="projects-list">
      {filteredProjects.map((project) => {
        const userLikedProject = allLikes.some(
          (like) => like.projectId === project.id && like.userId === currentUser.id
        );
        return (
          <div className="project-container" key={project.id}>
            <Link to={`/projects/${project.id}`} className="project-link">
              <div className="project">
                <div className="project-owner">{project.user.name}</div>
                <div className="project-name">{project.name}</div>
                <div className="image">
                  <img src={project.img} alt={project.name} />
                </div>
              </div>
            </Link>
            <div className="like-btn-container">
              {!userLikedProject && (
                <button className="like-btn" id={project.id} onClick={handleLike}>
                  Like
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};
