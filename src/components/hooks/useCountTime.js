import { useEffect, useState } from "react";
import { tripData } from "../../data/tripData";
import { useFormatTime } from "./formatTime";

const TIME_TRAVEL = "50:00";

export const useCountTimeBack = (props) => {
  const [formatDepartureTime, setFormatDepartureTime] = useState(null);
  const [res, setRes] = useState([]); // массив отсортированного времени отправления обратно с учетом времени "туда"

  let today = new Date(); // текущая дата строка Sat Oct 08 2022 23:34:39 GMT+0300 (Москва, стандартное время)
  let year = today.getFullYear(); // 2022
  let month = today.getMonth(); // текущий месяц
  let day = today.getDate(); // текущий день

  const travelTime = useFormatTime(TIME_TRAVEL);

  const arayTrip = tripData["из B в A"]; // массив с временем отправления обратно

  useEffect(() => {
    if (props.roundTrip && props.timeFromSelect) {
      setFormatDepartureTime(
        Date.parse(`${year}, ${month}, ${day}, ${props.timeFromSelect}`) +
          travelTime
      );
    }
  }, [day, month, year, props.roundTrip, props.timeFromSelect, travelTime]);

  useEffect(() => {
    if (props.roundTrip && props.timeFromSelect) {
      setRes(
        arayTrip.reduce((accum, item) => {
          let back = Date.parse(`${year}, ${month}, ${day}, ${item}`);
          if (back > formatDepartureTime) accum.push(item);
          return accum;
        }, [])
      );
    }
  }, [
    props.roundTrip,
    props.timeFromSelect,
    arayTrip,
    day,
    formatDepartureTime,
    month,
    year,
  ]);

  return { res };
};
