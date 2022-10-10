const TIME_TRAVEL = "50:00";

export const TotalInfo = (props) => {
  const { count, route, price, start, totalTime } = props;
  return (
    <div>
      Вы выбрали {count} билета по маршруту {route} стоимостью
      {price}р. Это путешествие займет у вас {TIME_TRAVEL} минут. Теплоход
      отправляется в {start}, а прибудет в {totalTime}.
    </div>
  );
};
