// eslint-disable-next-line react/prop-types
const StatusSelect = ({ register, name }) => {
  return (
    <select {...register(`${name}`)}>
      <option value=""></option>
      <option value="Done">Done</option>
      <option value="In work">In work</option>
      <option value="Pending">Pending</option>
    </select>
  );
};

export default StatusSelect;
