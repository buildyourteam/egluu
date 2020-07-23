import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
import useProfileInfoModify from "../hook/profile/useProfileInfoModify";

const Profile = () => {
  // url에서 userId 추출
  const location = useLocation();
  const url = location.pathname.split("/");
  const userId = url[2];

  // info 정보 get, post 하는 api
  const { getProfileInfo, postProfileInfo } = useProfileInfoApi();

  // info get의 상태변수와 데이터 및 액션 디스패쳐
  const [
    {
      data: resGetProfileInfo,
      fulfilled: getProfileInfoFulfilled,
      pending: getProfileInfoPending,
      rejected: getProfileInfoRejected,
      error: getProfileInfoError
    },
    { run: getProfileInfoApi }
  ] = useRequest(getProfileInfo);

  // info post 상태변수와 데이터 및 액션 디스패쳐
  const [
    {
      data: resPostProfileInfo,
      fulfilled: postProfileInfoFulfilled,
      pending: postProfileInfoPending,
      rejected: postProfileInfoRejected,
      error: postProfileInfoError
    },
    { run: postProfileInfoApi }
  ] = useRequest(postProfileInfo);

  // 상태변화에 대한 sideEffect에 쓰일 args
  const [profileData, infoModifying, setInfoModifying] = useProfileInfo(
    resGetProfileInfo,
    getProfileInfoFulfilled,
    getProfileInfoRejected,
    getProfileInfoError,
    getProfileInfoApi,

    userId
  );

  // modify창 열고 닫을 토글
  const infoModifyToggle = () => {
    setInfoModifying(!infoModifying);
  };

  useProfileInfoModify(
    resPostProfileInfo,
    postProfileInfoFulfilled,
    postProfileInfoRejected,
    postProfileInfoError,
    getProfileInfoApi,
    infoModifyToggle,
    userId
  );

  // 우측 탭 상태변수
  const [activeTab, setActiveTab] = useState("1");

  // 탭 토글
  const tabToggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Layout>
      <br />
      <Row xs="4">
        <Col>
          {infoModifying ? (
            <ProfileInfoModify
              data={profileData}
              api={postProfileInfoApi}
              userId={userId}
            />
          ) : getProfileInfoPending ? (
            <div>로딩중...</div>
          ) : (
            <>
              <ProfileInfo data={profileData} userId={userId} />
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
