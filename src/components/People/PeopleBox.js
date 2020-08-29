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
import { makeStyles } from "@material-ui/core/styles";
import { Badge as Stack } from "reactstrap";
import Badge from "@material-ui/core/Badge";
import Level from "./Level";
import "./People.css";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(2)
    },
    "& .MuiBadge-badge": {
      height: "30px",
      width: "30px",
      fontSize: "1rem",
      borderRadius: "15px",
      color: "#ffffff",
      backgroundColor: "#007bff"
    }
  }
}));

export default function PeopleBox(props) {
  const classes = useStyles();
  const data = props.data;

  return (
    <div id="PeopleBoxCard" className={classes.card}>
      <Link
        to={{
          pathname: `${props.url}`
        }}
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <Badge badgeContent={String(data.grade)} className={classes.root}>
          <Card>
            <CardImg
              top
              width="100%"
              src={`${process.env.REACT_APP_BASE_URL}profile/image/${data.userId}`}
              alt="Card image cap"
            />
            <CardBody>
              <div id="card-title">
                <CardTitle>{data.userId}</CardTitle>
              </div>

              <CardText id="card-text">
                {data.stack === null && " "}
                {data.stacks.map(value => {
                  return (
                    <Stack color="secondary" pill>
                      # {value}{" "}
                    </Stack>
                  );
                })}
              </CardText>
            </CardBody>
          </Card>
        </Badge>
      </Link>
    </div>
  );
}
