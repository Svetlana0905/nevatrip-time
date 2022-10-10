export const MySelect = (props) => {
  const getTime = (e) => {
    return e.split(" ").pop();
    // обрезка строки и получение времени из селекта
  };
  return (
    <>
      {Boolean(props.trigger) && (
        <>
          <label htmlFor={props.name}>{props.textLabel}</label>
          <select
            name={props.name}
            onClick={(e) => props.handleClick(getTime(e.target.value))}
          >
            {props.arr?.length
              ? props.arr.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))
              : "Время не найдено"}
          </select>
        </>
      )}
    </>
  );
};
export const SelectRoute = (props) => {
  return (
    <select
      name="route"
      id="route"
      onChange={(e) => props.setRoute(e.target.value)}
    >
      <option value="из A в B">из A в B</option>
      <option value="из B в A">из B в A</option>
      <option value="из A в B и обратно в А">из A в B и обратно в А</option>
    </select>
  );
};
