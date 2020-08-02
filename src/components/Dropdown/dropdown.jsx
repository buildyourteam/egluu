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

export default DropdownRole;
