export const TotalInfo = (props) => {
  const { count, route, price, start, totalTime, duration } = props;
  return (
    <div>
      Вы выбрали {count} билет(а) по маршруту {route} стоимостью {price}
      р.Теплоход отправляется в {start}, а прибудет в {totalTime}.
      Продолжительность {duration} минут.
    </div>
  );
};
