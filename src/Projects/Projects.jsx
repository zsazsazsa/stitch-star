import { useEffect, useState } from "react";
import "./Projects.css";
import { deleteProject, getProjectsByUserId } from "../Services/ProjectService";
import { Link, useNavigate } from "react-router-dom";

export const Projects = ({ currentUser }) => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [progress, setProgress] = useState({});

    useEffect(() => {
        getProjectsByUserId(currentUser.id).then((data) => {
            setProjects(data);
            setProgress(calculateSectionProgress(data));
        });
    }, [currentUser]);

    const calculateSectionProgress = (projects) => {
        return projects.reduce((acc, project) => {
            let allCompletedRows = 0;
            let allRowsTotal = 0;

            project.sectionProgress.forEach(section => {
                allCompletedRows += parseInt(section.rowsCompleted);
                allRowsTotal += parseInt(section.totalRows);
            });

            const percentage = allRowsTotal === 0 ? 0 : Math.floor((allCompletedRows / allRowsTotal) * 100);
            acc[project.id] = percentage;

            return acc;
        }, {});
    };

    const handleDelete = (e) => {
        const projectToDelete = projects.find(project => project.id === parseInt(e.target.id));
        deleteProject(projectToDelete.id).then(() => {
            getProjectsByUserId(currentUser.id).then(data => {
                setProjects(data);
                setProgress(calculateSectionProgress(data));
            });
        });
    };

    return (
        <>
            <div className="button-container">
                <button className="new-project-btn" onClick={() => {
                    navigate("/projects/new");
                }}>New Project</button>
            </div>
            <div className="projects-list">
                {projects.map(project => (
                    <div className="project-container" key={project.id}>
                        <Link to={`/projects/${project.id}`} className="project-link">
                            <div className="project">
                                <div className="project-number">Project #{project.id}</div>
                                <div className="project-name">{project.name}</div>
                                <div className="project-completion">{progress[project.id] || 0}%</div>
                            </div>
                        </Link>
                        <div className="project-btns">
                            <button className="edit-btn" onClick={() => {
                                navigate(`/projects/${project.id}/edit`);
                            }}>Edit</button>
                            <button id={project.id} className="delete-btn" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
