import "./card.scss";
import { tripData } from "../../data/tripData";
import { useEffect, useState } from "react";
import { MySelect, SelectRoute } from "../ui/select";
import { MyInput } from "../ui/input";
import { useCountTimeBack } from "../hooks/useCountTime";
import { useTotalPrice } from "../hooks/calculatePrice";
import { TotalInfo } from "../totalInfo/TotalInfo";
import { useCalculateTime } from "../hooks/useCalulateTime";

export const Card = () => {
  const [route, setRoute] = useState("из A в B");
  const [timeDep, setTimeDep] = useState(tripData[route]);
  const [timeFromSelect, setTimeFromSelect] = useState("");
  const [roundTrip, setRoundTrip] = useState(false);
  const [timeFromSelectBack, setTimeFromSelectBack] = useState("");
  const [countTicket, setCountTicket] = useState("");

  const timesBack = useCountTimeBack({
    timeFromSelect: timeFromSelect,
    roundTrip: roundTrip,
    timeOneWay: tripData.timeOneWay,
  });
  const { stringTime, travelDuration } = useCalculateTime({
    timeStart: timeFromSelect,
    roundTrip: roundTrip,
    timeBack: timeFromSelectBack,
    timeOneWay: tripData.timeOneWay,
  });

  useEffect(() => {
    if (route !== "из A в B и обратно в А") {
      setTimeDep(tripData[route]);
      setRoundTrip(false);
      setTimeFromSelectBack("");
      setCountTicket("");
    } else {
      setTimeDep(tripData["из A в B"]);
      setRoundTrip(true);
      setCountTicket("");
    }
  }, [route]);

  let { totalPrice, increment, timeError, ticketError } = useTotalPrice({
    amount: countTicket,
    round: roundTrip,
    timeBack: timeFromSelectBack,
  });

  return (
    <div className="card flex-column">
      <h1>Билеты на событие</h1>
      <SelectRoute setRoute={setRoute} />
      <MySelect
        trigger={timeDep}
        handleClick={setTimeFromSelect}
        arr={timeDep}
        textLabel="Выберите время"
        name="time"
      />
      <MySelect
        trigger={roundTrip}
        handleClick={setTimeFromSelectBack}
        arr={timesBack.res}
        textLabel="Выберите время обратно"
        name="timeBack"
      />
      {timeError && (
        <span style={{ color: "red", maxWidth: "300px" }}>
          Выберите время обратно
        </span>
      )}
      <span>Время туда {timeFromSelect} </span>
      {roundTrip && <span>Время обратно {timeFromSelectBack}</span>}
      <MyInput handleClick={setCountTicket} value={countTicket} />
      {ticketError && (
        <span style={{ color: "red", maxWidth: "300px" }}>
          Выберите количество билетов
        </span>
      )}
      <button onClick={increment}>Посчитать</button>
      {!!totalPrice && (
        <div style={{ maxWidth: "300px" }}>
          <TotalInfo
            count={countTicket}
            route={route}
            price={totalPrice}
            start={timeFromSelect}
            totalTime={stringTime}
            duration={travelDuration}
          />
        </div>
      )}
    </div>
  );
};
