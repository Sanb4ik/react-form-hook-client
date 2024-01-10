import axios from 'axios';
import Form from '../../components/form/form.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditPage = () => {
  const [project, setProject] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      setProject(response.data[id]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Form
      project={project}
      API_URL={`http://localhost:3001/api/projects/${id}`}
    ></Form>
  );
};

export default EditPage;
