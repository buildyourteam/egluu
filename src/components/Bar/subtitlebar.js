import React from "react";
import { Button } from "reactstrap";
import "./Bar.css";
const SubtitleHeader = (props) => {
  return (
    <Button onClick={props.onClick} color="link" id="subtitleheader">
      {props.children}
      {"> "}
    </Button>
  );
};
export default SubtitleHeader;
