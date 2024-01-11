import Form from '../../components/form/form.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../../config/API.js';

const EditPage = () => {
  const [project, setProject] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await API.get(`projects/${id}`);
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
        API_URL={`projects/${id}`}
      ></Form>
    </>
  );
};

export default EditPage;
