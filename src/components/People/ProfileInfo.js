import React from "react";
import {
  Row,
  Col,
  Alert,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText
} from "reactstrap";

import profile from "../icon/baseImg.png";

const ProfileInfo = () => {
  return (
    <div>
      <Alert color="secondary">hi~ I'm developer</Alert>
      {/* img reseize 하는 방법 추가해야함 */}
      <img src={profile} width="195" height="195"></img>
      <h3>inho2736</h3>
      <h6>Lev. 24 Developer</h6>
      <p>#ReactJs #Javascript</p>
    </div>
  );
};

export default ProfileInfo;
