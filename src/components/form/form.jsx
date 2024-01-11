import { useFieldArray, useForm } from 'react-hook-form';
import './form.css';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';
import { schema } from '../../utils/formValidationSchema.js';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from '../status-select/status-select.jsx';
import { getDirtyValues } from '../../utils/getDirtyValues.js';
import Task from '../task/task.jsx';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/API.js';

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

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const dirtyValue = getDirtyValues(dirtyFields, data);
    try {
      await API.post(`${API_URL}`, dirtyValue);
    } catch (error) {
      console.error(error);
    }
    navigate(-1);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('name')}
          placeholder="Project Name"
        />
        <span>{errors.name?.message}</span>
        <input
          type="text"
          {...register('description')}
          placeholder="Description"
        />
        <span>{errors.description?.message}</span>
        <Select
          register={register}
          name="priority"
          options={['High', 'Normal', 'Low']}
        />
        <span>{errors.priority?.message}</span>
        <Select
          register={register}
          name="status"
          options={['Done', 'In work', 'Pending']}
        />
        <span>{errors.status?.message}</span>
        <div className="radio-container">
          <div className="radioField">
            <p>Comment</p>
            <input
              type="radio"
              {...register('radioField')}
              value="Comment"
            />
          </div>
          <div className="radioField">
            <p>Technology</p>
            <input
              type="radio"
              {...register('radioField')}
              value="Technology"
            />
          </div>
        </div>

        {selectedRadioValue === 'Comment' && (
          <div>
            <input
              type="text"
              {...register('comment')}
              placeholder="Comment"
            />
          </div>
        )}
        {selectedRadioValue === 'Technology' && (
          <div>
            <Select
              register={register}
              name="technology"
              options={['Node.js', '.Net']}
            />
          </div>
        )}
        <label>Tasks</label>
        <ul>
          {fields.map((task, index) => (
            <Task
              key={index}
              task={task}
              register={register}
              index={index}
              remove={remove}
            />
          ))}
        </ul>
        <button
          className="task-button add"
          type="button"
          onClick={() => append({ taskName: '', status: '' })}
        >
          Add Task
        </button>
        <button
          type="submit"
          className="add-project"
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default ProjectForm;
