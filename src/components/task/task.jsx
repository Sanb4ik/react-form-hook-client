import StatusSelect from '../status-select/status-select.jsx';

const Task = ({ register, task, index, remove }) => {
  return (
    <li key={task.id}>
      <input
        type="text"
        {...register(`tasks[${index}].taskName`)}
      />
      <StatusSelect
        register={register}
        name={`tasks[${index}].status`}
        options={['Done', 'In work', 'Pending']}
      />
      <button
        className="task-button remove"
        type="button"
        onClick={() => remove(index)}
      >
        Remove Task
      </button>
    </li>
  );
};

export default Task;
