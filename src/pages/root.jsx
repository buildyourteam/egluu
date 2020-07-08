import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Progress
} from "reactstrap";
import { useTemporaryApi, useGetTemporary, usePostTemporary, useRequest, useMove } from '../hook';
import { Button, Layout, Jumbotron, SubtitleHeader, ProjectBox } from '../components';



export default function Root(){
    const [temporary, apiAction] = useTemporaryApi();
    const [
        {
          data: getData,
          fulfilled: getFulfilled,
          pending: getPending,
          rejected: getRejected,
          error: getError,
        },
        { run: getApi },
      ] = useRequest(apiAction.getApi);
      const [
        {
          data: postData,
          fulfilled: postFulfilled,
          pending: postPending,
          rejected: postRejected,
          error: postError,
        },
        { run: postApi },
      ] = useRequest(apiAction.postApi);
      const [tempState, changeState] = useGetTemporary(getData, getFulfilled, getRejected, getError, getApi);
      usePostTemporary(postData, postFulfilled, postRejected, postError, postApi); 
      useMove(postFulfilled, './');

      const clickPost = () => {
        apiAction.postApi(tempState)
      }

      return (
        <Layout>
          <Jumbotron />
          <SubtitleHeader>마감임박 프로젝트</SubtitleHeader>
          <Row xs="12">
          {staticProjectData.map(value => {return (
            <Col xs="3">
            <ProjectBox data={value}/>          
            </Col>
          )})}
          </Row>     
            root page
            {(getPending || postPending) ? (
                <div>
                    로딩중...
                    </div>
            ) : (
                <div>
                    <Button onClick={changeState.clickPlusButton}>숫자 늘리기</Button>
                    <Button onClick={clickPost}>data post</Button>
                    <div>
                        state값 : {tempState}
                        <br />
                        redux값 : {postData}
                    </div>
                </div>
            )} 
        </Layout>
    )
}













const staticProjectData = [
  {
    projectId: 16,
    projectName: "project0",
    teamName: "project team0",
    endDate: "2020-03-30T23:59:00",
    description: "need zero 입니다.",
    dday: 5,
    status: "RECRUTING",
    projectField: null,
    currentMember: {
      developer: 2,
      designer: 1,
      planner: 1,
      etc: 2
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4
    },
    leaderId: null
  },
  {
    projectId: 16,
    projectName: "project0",
    teamName: "project team0",
    endDate: "2020-03-30T23:59:00",
    description: "need zero 입니다.",
    dday: 5,
    status: "RECRUTING",
    projectField: null,
    currentMember: {
      developer: 2,
      designer: 1,
      planner: 1,
      etc: 2
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4
    },
    leaderId: null
  },
  {
    projectId: 16,
    projectName: "project0",
    teamName: "project team0",
    endDate: "2020-03-30T23:59:00",
    description: "need zero 입니다.",
    dday: 5,
    status: "RECRUTING",
    projectField: null,
    currentMember: {
      developer: 2,
      designer: 1,
      planner: 1,
      etc: 2
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4
    },
    leaderId: null
  },
  {
    projectId: 16,
    projectName: "project0",
    teamName: "project team0",
    endDate: "2020-03-30T23:59:00",
    description: "need zero 입니다.",
    dday: 5,
    status: "RECRUTING",
    projectField: null,
    currentMember: {
      developer: 2,
      designer: 1,
      planner: 1,
      etc: 2
    },
    needMember: {
      developer: 2,
      designer: 2,
      planner: 3,
      etc: 4
    },
    leaderId: null
  }
];

