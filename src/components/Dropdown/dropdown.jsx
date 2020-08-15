import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const role = ["DEVELOPER", "DESIGNER", "PLANNER", "ETC"];

const DropdownRole = (props) => {
  const { dropdownCaret, dropdownHeader, action, pick } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [caret, setCaret] = useState(dropdownCaret);
  useEffect(() => {
    if (pick !== "") setCaret(pick);
  }, [pick]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      {console.log(caret)}
      <DropdownToggle caret>{caret}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={(e) => action("DEVELOPER")}>
          DEVELOPER
        </DropdownItem>
        <DropdownItem onClick={(e) => action("DESIGNER")}>
          DESIGNER
        </DropdownItem>
        <DropdownItem onClick={(e) => action("PLANNER")}>PLANNER</DropdownItem>
        <DropdownItem onClick={(e) => action("ETC")}>ETC</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const DropdownField = (props) => {
  const { dropdownCaret, dropdownHeader, action, pick } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [caret, setCaret] = useState(dropdownCaret);
  useEffect(() => {
    if (pick !== "") setCaret(pick);
  }, [pick]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle style={props.style} caret>
        {caret}
      </DropdownToggle>
      <DropdownMenu style={props.style}>
        <DropdownItem onClick={(e) => action("APP")}>APP</DropdownItem>
        <DropdownItem onClick={(e) => action("WEB")}>WEB</DropdownItem>
        <DropdownItem onClick={(e) => action("AI")}>AI</DropdownItem>
        <DropdownItem onClick={(e) => action("HW")}>HW</DropdownItem>
        <DropdownItem onClick={(e) => action("BLOCKCHAIN")}>
          BLOCKCHAIN
        </DropdownItem>
        <DropdownItem onClick={(e) => action("SYSTEM")}>SYSTEM</DropdownItem>
        <DropdownItem onClick={(e) => action("ETC")}>ETC</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export { DropdownRole, DropdownField };
