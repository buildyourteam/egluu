import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openAlert, closeAlert } from "../reducers/alert";

export default function useAlert() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.alert.isOpen);
  const sentence = useSelector((state) => state.alert.sentence);

  const open = (data) => {
    dispatch(openAlert(data));
  };

  const close = () => {
    dispatch(closeAlert());
  };

  return [
    { sentence, isOpen },
    {
      open,
      close,
    },
  ];
}
