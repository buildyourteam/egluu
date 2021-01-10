import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openAlert, closeAlert } from "../reducers/alert";
import { RootState } from '../reducers';

export default function useAlert() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.alert.isOpen);
  const sentence = useSelector((state: RootState) => state.alert.sentence);

  const open = (data: String) => {
    dispatch(openAlert(data));
  };

  const close = () => {
    dispatch(closeAlert());
  };

  return {
    alertState: { sentence, isOpen },
    alertAction: {
      open,
      close,
    },
  };
}
