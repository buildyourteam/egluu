import React, { useState } from "react";
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
import sampleimg from "../icon/baseImg.png";
import './Project.css'

export default function ProjectBox(props) {
  const staticProjectData = props.data;
  // 0으로 나눌 경우 예외처리!
  const developerPercent =
    (staticProjectData.currentMember.developer /
      staticProjectData.needMember.developer) *
    100;
  const plannerPercent =
    (staticProjectData.currentMember.planner /
      staticProjectData.needMember.planner) *
    100;
  const designerPercent =
    (staticProjectData.currentMember.designer /
      staticProjectData.needMember.designer) *
    100;
  const etcPercent =
    (staticProjectData.currentMember.etc /
      staticProjectData.needMember.etc) *
    100;
  return (
    <div id="ProjectBoxCard" >
      <Card>
        <CardImg
          width="100%"
          height="150"
          src={`http://34.105.29.115:8080/projects/image/${staticProjectData.projectId}`}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{staticProjectData.projectName}</CardTitle>
          <CardSubtitle>{staticProjectData.teamName}</CardSubtitle>
          <CardText>D-{staticProjectData.dday}</CardText>
          <Row xs="12">
            <Col xs="6">
              <Progress color="success" value={developerPercent}>
                {developerPercent}
              </Progress>
              <CardText>developer</CardText>
              <Progress color="success" value={plannerPercent}>
                {plannerPercent}
              </Progress>
              <CardText>planner </CardText>
            </Col>
            <Col xs="6">
              <Progress color="success" value={designerPercent}>
                {designerPercent}
              </Progress>
              <CardText>designer</CardText>
              <Progress color="success" value={etcPercent}>
                {etcPercent}
              </Progress>
              <CardText>etc</CardText>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}