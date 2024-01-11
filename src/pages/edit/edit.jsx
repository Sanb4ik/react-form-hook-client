import axios from 'axios';
import Form from '../../components/form/form.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditPage = () => {
  const [project, setProject] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/projects/${id}`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      console.log(response.data);
      setProject(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Edit Page</h1>
      <Form
        project={project}
        API_URL={`http://localhost:3001/api/projects/${id}`}
      ></Form>
    </>
  );
};

export default EditPage;
