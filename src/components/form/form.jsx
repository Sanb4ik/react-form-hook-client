import { useFieldArray, useForm } from 'react-hook-form';
import './form.css';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import StatusSelect from '../status-select/status-select.jsx';

const schema = yup.object().shape({
  name: yup.string().required('Project name required'),
  description: yup
    .string()
    .required('Description required')
    .max(50, 'Max length of description - 50 chars'),
  priority: yup.string().required(),
  status: yup.string().required(),
});

// eslint-disable-next-line react/prop-types
const ProjectForm = ({ project, API_URL }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { dirtyFields, errors },
  } = useForm({
    defaultValues: project,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset(project);
  }, [project, reset]);

  const selectedRadioValue = watch('radioField');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });

  const onSubmit = async (data) => {
    const dirtyValue = getDirtyValues(dirtyFields, data);
    try {
      const response = await axios.post(`${API_URL}`, dirtyValue, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function getDirtyValues(dirtyFields, allValues) {
    const result = {};

    for (const key in dirtyFields) {
      if (dirtyFields[key] === true && key !== 'radioField') {
        result[key] = allValues[key];
      } else if (typeof dirtyFields[key] === 'object') {
        const nested = getDirtyValues(dirtyFields[key], allValues[key]);
        if (Object.keys(nested).length > 0) {
          result[key] = nested;
        }
      }
    }
    console.log(result);
    return result;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Project Name:</label>
        <input
          type="text"
          {...register('name')}
        />
        <span>{errors.name?.message}</span>
        <label>Description:</label>
        <input
          type="text"
          {...register('description')}
        />
        <span>{errors.description?.message}</span>
        <label>Priority:</label>
        <select {...register('priority')}>
          <option value=""></option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
        <span>{errors.priority?.message}</span>
        <label>Status:</label>
        {/*<select {...register('status')}>*/}
        {/*  <option value=""></option>*/}
        {/*  <option value="Done">Done</option>*/}
        {/*  <option value="In work">In work</option>*/}
        {/*  <option value="Pending">Pending</option>*/}
        {/*</select>*/}
        <StatusSelect
          register={register}
          name="status"
        />
        <span>{errors.status?.message}</span>
        <p>Comment</p>
        <input
          type="radio"
          {...register('radioField')}
          value="Comment"
        />
        <p>Technology</p>{' '}
        <input
          type="radio"
          {...register('radioField')}
          value="Technology"
        />
        {selectedRadioValue === 'Comment' && (
          <div>
            <label>Comment:</label>
            <input
              type="text"
              {...register('comment')}
            />
          </div>
        )}
        {selectedRadioValue === 'Technology' && (
          <div>
            <label>Technology:</label>
            <select {...register('technology')}>
              <option value="Node.js">Node.js</option>
              <option value=".Net">.Net</option>
            </select>
          </div>
        )}
        <label>Tasks:</label>
        <ul>
          {fields.map((task, index) => (
            <li key={task.id}>
              <input
                type="text"
                {...register(`tasks[${index}].name`)}
              />
              <StatusSelect
                register={register}
                name={`tasks[${index}].status`}
              />
              <button
                type="button"
                onClick={() => remove(index)}
              >
                Remove Task
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => append({ name: '', status: '' })}
        >
          Add Task
        </button>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default ProjectForm;
