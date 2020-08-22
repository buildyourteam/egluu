import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Progress,
} from "reactstrap";
import sampleimg from "../icon/baseImg.png";
import "./Project.css";
const moment = require("moment-timezone"); //상단에 선언

export default function ProjectBox(props) {
  const staticProjectData = props.data;
  const nowDay = Date.parse(moment().tz("Asia/Seoul").format());
  const dday = Math.floor(
    (Date.parse(staticProjectData.endDate) - nowDay) / (24 * 3600 * 1000)
  );
  // 0으로 나눌 경우 예외처리!
  const developerPercent =
    staticProjectData.currentMember.developer !== 0
      ? (staticProjectData.currentMember.developer /
          staticProjectData.needMember.developer) *
        100
      : 0;
  const plannerPercent =
    staticProjectData.currentMember.planner !== 0
      ? (staticProjectData.currentMember.planner /
          staticProjectData.needMember.planner) *
        100
      : 0;

  const designerPercent =
    staticProjectData.currentMember.designer !== 0
      ? (staticProjectData.currentMember.designer /
          staticProjectData.needMember.designer) *
        100
      : 0;

  const etcPercent =
    staticProjectData.currentMember.etc !== 0
      ? (staticProjectData.currentMember.etc /
          staticProjectData.needMember.etc) *
        100
      : 0;

  return (
    <div id="ProjectBoxCard">
      <Link
        to={{
          pathname: `${props.url}`,
        }}
        style={{ textDecoration: "none" }}
      >
        <Card>
          <CardImg
            width="240px"
            height="180px"
            src={`${process.env.REACT_APP_BASE_URL}projects/image/${staticProjectData.projectId}`}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{staticProjectData.projectName}</CardTitle>
            <CardSubtitle>{staticProjectData.teamName}</CardSubtitle>
            <CardText>D-{dday}</CardText>
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
      </Link>
    </div>
  );
}
