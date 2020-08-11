import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, ProfileInfo, ProfileInfoModify } from "../components";
import { useSelector } from "react-redux";
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
import RunningProjects from "../components/People/Profile/ProfileProjects/RunningProjects";
import EndedProjects from "../components/People/Profile/ProfileProjects/EndedProjects";
import PlanProjects from "../components/People/Profile/ProfileProjects/PlanProjects";
import RecruitModal from "../components/People/Profile/RecruitModal";

const Profile = () => {
  // url에서 userId 추출
  const location = useLocation();
  const url = location.pathname.split("/");
  const userId = url[2];

  const myId = useSelector(state => state.login.userId);

  // 컴포넌트 이동을 다룰 변수
  const [modifying, setModifying] = useState(false);

  // modify창 열고 닫을 토글
  const modifyToggle = () => {
    setModifying(!modifying);
  };

  const [info, setInfo] = useState({
    userName: "",
    role: "",
    stacks: [""],
    contact: "",
    area: "",
    grade: 0,
    introduction: ""
  });

  const [imgState, setImgState] = useState({
    imgUrl: "",
    isImgChange: false
  });

  // Recruit modal
  const [modal, setModal] = useState(false);
  const recruitToggle = () => setModal(!modal);
  console.log(modal);

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
          {modifying ? (
            <ProfileInfoModify
              setModifying={modifyToggle}
              info={info}
              setInfo={setInfo}
              imgState={imgState}
              setImgState={setImgState}
              userId={userId}
            />
          ) : (
            <>
              <ProfileInfo
                setModifying={modifyToggle}
                info={info}
                setInfo={setInfo}
                imgState={imgState}
                setImgState={setImgState}
                userId={userId}
              />

              {myId &&
                (userId === myId ? (
                  <Button onClick={modifyToggle}>Modify</Button>
                ) : (
                  <>
                    <Button onClick={recruitToggle}> recruit </Button>
                  </>
                ))}
              {modal && (
                <RecruitModal
                  modal={modal}
                  toggle={recruitToggle}
                  userId={userId}
                />
              )}
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
                  Ended Projects
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
                  Plan Projects
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <EndedProjects userId={userId} />
              </TabPane>

              <TabPane tabId="2">
                <RunningProjects userId={userId} />
              </TabPane>

              <TabPane tabId="3">
                <PlanProjects userId={userId} />
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
