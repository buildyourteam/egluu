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

      {/* width="100%" 으로 비율유지 
object-fit="contain" 으로 1/4칸에 딱 맞게 조정 */}
      <img src={profile} width="100%" object-fit="contain"></img>
      <h3>inho2736</h3>
      <h6>Lev. 24 Developer</h6>
      <p>#ReactJs #Javascript</p>
    </div>
  );
};

export default ProfileInfo;
