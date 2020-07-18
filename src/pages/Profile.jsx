import React, { useState } from "react";
import { Layout, ProfileInfo, ProfileInfoModify } from "../components";
import { useTemporaryApi, useRequest } from "../hook";
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
import useProfileInfo from "../hook/profile/useProfileInfo";
const Profile = () => {
  const [temporary, apiAction] = useTemporaryApi();
  const [
    {
      data: resProfileData,
      fulfilled: getProfileDataFulfilled,
      pending: getProfileDataPending,
      rejected: getProfileDataRejected,
      error: getProfileDataError
    },
    { run: getProfileDataApi }
  ] = useRequest(apiAction.getProfileData);

  const [profileData] = useProfileInfo(
    resProfileData,
    getProfileDataFulfilled,
    getProfileDataPending,
    getProfileDataRejected,
    getProfileDataError,
    getProfileDataApi
  );
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Layout>
      <br />
      <Row xs="4">
        <Col>
          {getProfileDataPending ? <div>로딩중...</div> : <ProfileInfoModify />}
        </Col>
        <Col xs="9">
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
