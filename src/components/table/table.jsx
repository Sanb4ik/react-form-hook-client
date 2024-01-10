import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/projects', {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        });
        setProjects(response.data);
        console.log(projects);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);
  const handleClick = (id) => {
    navigate(`edit/${id}`);
  };

  return (
    <div className="main-table">
      <div className="row">
        <div className="cell id">id</div>
        <div className="cell">name</div>
        <div className="cell">description</div>
        <div className="cell">priority</div>
        <div className="cell technology">status</div>
        <div className="cell">comment</div>
        <div className="cell technology">technology</div>
        <div className="cell task">tasks</div>
      </div>
      {projects.map((project, index) => (
        <div
          className="row"
          key={index}
        >
          <button
            className="cell id"
            onClick={() => handleClick(index)}
          >
            Edit {index}
          </button>
          <div className="cell">{project.name}</div>
          <div className="cell">{project.description}</div>
          <div className="cell">{project.priority}</div>
          <div className="cell technology">{project.status}</div>
          <div className="cell">{project.comment}</div>
          <div className="cell technology">{project.technology}</div>
          <div className="cell task">
            <div className="sub-table">
              {project.tasks && project.tasks.length > 0 ? (
                project.tasks.map((task, index) => (
                  <div
                    className="sub-row"
                    key={`task_${index}`}
                  >
                    <div className="sub-cell">{task.name}</div>
                    <div className="sub-cell">{task.status}</div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;