import React, { useState } from "react";
import { Layout, ProfileInfo, ProfileInfoModify } from "../components";
import { useProfileInfoApi } from "../hook/api/profileApi";
import { useRequest } from "../hook";
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import classnames from "classnames";
import useProfileInfo from "../hook/profile/useProfileInfo";
const Profile = () => {
  const { getProfileInfo, postProfileInfo } = useProfileInfoApi();

  const [
    {
      data: resProfileInfo,
      fulfilled: getProfileInfoFulfilled,
      pending: getProfileInfoPending,
      rejected: getProfileInfoRejected,
      error: getProfileInfoError
    },
    { run: getProfileInfoApi }
  ] = useRequest(getProfileInfo);

  const [profileData] = useProfileInfo(
    resProfileInfo,
    getProfileInfoFulfilled,
    getProfileInfoPending,
    getProfileInfoRejected,
    getProfileInfoError,
    getProfileInfoApi
  );

  const [activeTab, setActiveTab] = useState("1");

  const tabToggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [infoModifying, setInfoModifying] = useState(false);
  const infoModifyToggle = () => {
    setInfoModifying(!infoModifying);
  };
  return (
    <Layout>
      <br />
      <Row xs="4">
        <Col>
          {infoModifying ? (
            <ProfileInfoModify data={profileData} />
          ) : getProfileInfoPending ? (
            <div>로딩중...</div>
          ) : (
            <>
              <ProfileInfo data={profileData} />
              <Button onClick={infoModifyToggle}>Modify</Button>
            </>
          )}
        </Col>
        <Col xs="9">
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    tabToggle("1");
                  }}
                >
                  Completed Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    tabToggle("2");
                  }}
                >
                  Running Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => {
                    tabToggle("3");
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
