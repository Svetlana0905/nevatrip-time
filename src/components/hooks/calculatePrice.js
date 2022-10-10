import { useCallback, useState } from "react";
import { tripData } from "../../data/tripData";

export const useTotalPrice = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [timeError, setTimeError] = useState(false);
  const [ticketError, setTicketError] = useState(false);

  const increment = useCallback(() => {
    if (!props.round) {
      setTotalPrice(props.amount * tripData.oneTicketPrice);
      setTimeError(false);
      setTicketError(false);
    } else if (props.round && props.timeBack && props.amount > 0) {
      setTotalPrice(props.amount * tripData.roundTicketPrice);
      setTimeError(false);
      setTicketError(false);
    } else if (props.round && !props.timeBack) {
      setTotalPrice(0);
      setTimeError(true);
    } else if (props.round && !props.amount) {
      setTotalPrice(0);
      setTicketError(true);
    }
  }, [props.amount, props.round, props.timeBack]);

  return { totalPrice, increment, timeError, ticketError };
};
