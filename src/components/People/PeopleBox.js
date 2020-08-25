import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  Button
} from "reactstrap";
import sampleimg from "../icon/baseImg.png";
import Level from "./Level";
import "./People.css";
import { Link } from "react-router-dom";

export default function PeopleBox(props) {
  const data = props.data;

  return (
    <div id="PeopleBoxCard">
      <Link
        to={{
          pathname: `${props.url}`
        }}
        style={{ textDecoration: "none" }}
      >
        <Card>
          <CardImg top width="100%" src={sampleimg} alt="Card image cap" />
          <CardBody>
            <div>
              <Row xs="12">
                <Col xs="9">
                  {/* <CardTitle>{data.userName}</CardTitle> */}
                  <CardSubtitle>{data.userId}</CardSubtitle>
                </Col>
                <Col xs="3">
                  <Level data={data.level} />
                </Col>
              </Row>
            </div>

            <CardText>
              {data.stacks.map(value => {
                return "#" + value + " ";
              })}
            </CardText>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}
