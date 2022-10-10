export const MyInput = (props) => {
  return (
    <>
      <label htmlFor="num">Количество билетов {props.value}</label>
      <input
        id="num"
        type="number"
        value={props.value}
        onChange={(e) => props.handleClick(e.target.value)}
      />
    </>
  );
};
