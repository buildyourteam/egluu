import React from "react";
import { Button } from "reactstrap";

export default function Level(props) {
  const data = props.data;

  return <Button>{data}</Button>;
}
