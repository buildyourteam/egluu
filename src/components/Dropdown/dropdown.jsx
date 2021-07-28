import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const role = ["DEVELOPER", "DESIGNER", "PLANNER", "ETC"];

const DropdownRole = (props) => {
  const { dropdownCaret, action, pick } = props;
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [caret, setCaret] = useState(dropdownCaret);
    const handleClick = (event) => {
        setDropdownOpen(event.currentTarget);
    };
    const handleClose = () => {
        setDropdownOpen(null);
    };
    const handleClickItem = (menu) => {
        action(menu);
        setDropdownOpen(null);
    }
  useEffect(() => {
    if (pick !== "") setCaret(pick);
  }, [pick]);
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {caret}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={dropdownOpen}
        keepMounted
        open={dropdownOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => handleClickItem("DEVELOPER")}>
          DEVELOPER
        </MenuItem>
        <MenuItem onClick={(e) => handleClickItem("DESIGNER")}>
          DESIGNER
        </MenuItem>
        <MenuItem onClick={(e) => handleClickItem("PLANNER")}>PLANNER</MenuItem>
        <MenuItem onClick={(e) => handleClickItem("ETC")}>ETC</MenuItem>
      </Menu>
    </div>
  );
};

const DropdownField = (props) => {
  const { dropdownCaret, action, pick } = props;
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [caret, setCaret] = useState(dropdownCaret);
  const handleClick = (event) => {
    setDropdownOpen(event.currentTarget);
  };
  const handleClose = () => {
    setDropdownOpen(null);
  };
  const handleClickItem = (menu) => {
    action(menu);
    setDropdownOpen(null);
  };
  useEffect(() => {
    if (pick !== "") setCaret(pick);
  }, [pick]);
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {caret}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={dropdownOpen}
        keepMounted
        open={dropdownOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => handleClickItem("APP")}>APP</MenuItem>
        <MenuItem onClick={(e) => handleClickItem("WEB")}>WEB</MenuItem>
        <MenuItem onClick={(e) => handleClickItem("AI")}>AI</MenuItem>
        <MenuItem onClick={(e) => handleClickItem("HW")}>HW</MenuItem>
        <MenuItem onClick={(e) => handleClickItem("BLOCKCHAIN")}>
          BLOCKCHAIN
        </MenuItem>
        <MenuItem onClick={(e) => handleClickItem("SYSTEM")}>SYSTEM</MenuItem>
        <MenuItem onClick={(e) => handleClickItem("ETC")}>ETC</MenuItem>
      </Menu>
    </div>
  );
};
export { DropdownRole, DropdownField };
