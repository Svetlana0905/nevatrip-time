import { useEffect, useState } from "react";
import { useFormatTime } from "./formatTime";
import { formatDate } from "./formatDate";

export const useCalculateTime = (props) => {
  const [time, setTime] = useState(null);
  const [stringTime, setStringTime] = useState("");
  const [travelDuration, setTravelDuration] = useState("");
  const [year, month, day] = formatDate();

  const travelTime = useFormatTime(props.timeOneWay);

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
