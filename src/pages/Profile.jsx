import React, { useState } from "react";
import { Layout } from "../components";
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
import classnames from "classnames";
import profile from "../components/icon/baseImg.png";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Layout>
      <br />
      <Row xs="4">
        <Col>
          <div>
            <Alert color="secondary">hi~ I'm developer</Alert>
            {/* img reseize 하는 방법 추가해야함 */}
            <img src={profile} width="195" height="195"></img>
            <h3>Inho</h3>
            <p>inho2736</p>
            <h6>Lev. 24 Developer</h6>
            <p>#ReactJs #Javascript</p>
          </div>
        </Col>
        <Col xs="9">
          {" "}
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Completed Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Running Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Planned Projects
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Tab 1 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">sdfsd</TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
