import React from "react";
import { Button } from "reactstrap";
import "./People.css";
export default function Level(props) {
  const data = props.data;

  return (
    <Button color="info" className="level">
      {data}
    </Button>
  );
}
