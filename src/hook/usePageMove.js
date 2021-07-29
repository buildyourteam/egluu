import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useMove(condition, destination) {
  const history = useHistory();

  useEffect(() => {
    if (condition) history.push(`./${destination}`);
  }, [condition]);

  useEffect(() => {
    if (condition) {
      history.push(`./${destination}`);
    }
  }, [condition]);
}
