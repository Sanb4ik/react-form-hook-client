const Select = ({ register, name, options }) => {
  return (
    <select
      {...register(`${name}`)}
      className="placeholder"
    >
      <option
        value=""
        className="placeholder"
      >
        Select {name === 'priority' || name === 'technology' ? name : 'status'}
      </option>
      {options.map((item) => (
        <option
          value={item}
          key={item}
        >
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;
