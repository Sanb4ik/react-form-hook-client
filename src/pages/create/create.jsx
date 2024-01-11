import Form from '../../components/form/form.jsx';

const CreatePage = () => {
  return (
    <>
      <h1>Create Page</h1>
      <Form API_URL={'http://localhost:3001/api/project'}></Form>
    </>
  );
};

export default CreatePage;
