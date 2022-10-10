import { useEffect, useState } from "react";
import { useFormatTime } from "./formatTime";

const TIME_TRAVEL = "50:00";

export const useCalculateTime = (props) => {
  const [time, setTime] = useState(null);
  const [stringTime, setStringTime] = useState("");
  const [travelDuration, setTravelDuration] = useState("");

  let today = new Date(); // текущая дата строка Sat Oct 08 2022 23:34:39 GMT+0300 (Москва, стандартное время)
  let year = today.getFullYear(); // 2022
  let month = today.getMonth(); // текущий месяц
  let day = today.getDate(); // текущий день

  const travelTime = useFormatTime(TIME_TRAVEL);

  useEffect(() => {
    if (props.timeStart && props.timeBack) {
      let timeStart = Date.parse(
        `${year}, ${month}, ${day}, ${props.timeStart}`
      );
      let timeBack =
        Date.parse(`${year}, ${month}, ${day}, ${props.timeBack}`) + travelTime;
      let different = timeBack - timeStart;
      let hours = Math.floor((different % 86400000) / 3600000);
      let minutes = Math.round(((different % 86400000) % 3600000) / 60000);

      setTravelDuration(hours + ":" + minutes);
    } else setTravelDuration("50");
  }, [day, month, year, props.timeStart, props.timeBack, travelTime]);

  console.log(travelDuration);

  useEffect(() => {
    if (props.roundTrip && props.timeStart && props.timeBack) {
      setTime(
        Date.parse(`${year}, ${month}, ${day}, ${props.timeBack}`) + travelTime
      );
    } else
      setTime(
        Date.parse(`${year}, ${month}, ${day}, ${props.timeStart}`) + travelTime
      );
  }, [
    day,
    month,
    year,
    props.roundTrip,
    props.timeStart,
    travelTime,
    props.timeBack,
  ]);

  useEffect(() => {
    if (time) {
      let hours = new Date(time).getHours();
      let minutes = new Date(time).getMinutes();
      setStringTime(`${hours}:${minutes}`);
    }
  }, [time]);

  return { stringTime, travelDuration };
};
