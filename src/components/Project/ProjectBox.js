import React from "react";
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
import "./Project.css";
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export default function ProjectBox(props) {
  const staticProjectData = props.data;
  const nowDay = Date.parse(dayjs());
  const dday = Math.floor(
    (Date.parse(staticProjectData.endDate) - nowDay) / (24 * 3600 * 1000),
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
        style={{ textDecoration: "none", color: "#000000" }}
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
            <Row xs="12" id="team_dday">
              <Col xs="9">
                <CardSubtitle>{staticProjectData.teamName}</CardSubtitle>
              </Col>
              <Col xs="3">
                <CardSubtitle>D-{dday}</CardSubtitle>
              </Col>
            </Row>
            <Row xs="12" id="member-count">
              <Col xs="6">
                <CardText>developer</CardText>
                <Progress color="#007bff" value={developerPercent}>
                  {developerPercent}
                </Progress>
                <CardText>planner </CardText>
                <Progress color="#007bff" value={plannerPercent}>
                  {plannerPercent}
                </Progress>
              </Col>
              <Col xs="6">
                <CardText>designer</CardText>
                <Progress color="#007bff" value={designerPercent}>
                  {designerPercent}
                </Progress>
                <CardText>etc</CardText>
                <Progress color="#007bff" value={etcPercent}>
                  {etcPercent}
                </Progress>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}
