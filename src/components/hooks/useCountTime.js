import { useEffect, useState } from "react";
import { tripData } from "../../data/tripData";
import { useFormatTime } from "./formatTime";
import { formatDate } from "./formatDate";

export const useCountTimeBack = (props) => {
  const [formatDepartureTime, setFormatDepartureTime] = useState(null);
  const [res, setRes] = useState([]); // массив отсортированного времени отправления обратно с учетом времени "туда"
  const [year, month, day] = formatDate();

  const travelTime = useFormatTime(props.timeOneWay);

  const arayTrip = tripData["из B в A"]; // массив с временем отправления обратно

  useEffect(() => {
    if (props.roundTrip && props.timeFromSelect) {
      setFormatDepartureTime(
        Date.parse(`${year}, ${month}, ${day}, ${props.timeFromSelect}`) +
          travelTime
      );
    }
  }, [props.roundTrip, props.timeFromSelect, travelTime, year, month, day]);

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
    formatDepartureTime,
    year,
    month,
    day,
  ]);

  return { res };
};
