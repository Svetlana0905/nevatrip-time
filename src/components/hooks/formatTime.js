import { useEffect, useState } from "react";

export const useFormatTime = (props) => {
  const [count, setCount] = useState(0);
  const [split, setSplit] = useState([]);

  useEffect(() => {
    if (props) setSplit(props.split(":"));
  }, [props]);

  useEffect(() => {
    if (split.length) setCount(split[0] * 60000 + split[1] * 1000);
  }, [split]);

  return count;
};
