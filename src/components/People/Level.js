import React from "react";
import { Button } from "reactstrap";
import "./People.css";
export default function Level(props) {
  const data = props.data;

  return <Button className="level">{data}</Button>;
}
