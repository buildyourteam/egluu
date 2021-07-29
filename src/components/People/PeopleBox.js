import React, { useState } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Badge as Stack } from "reactstrap";
import Badge from "@material-ui/core/Badge";
import "./People.css";
import { Link } from "react-router-dom";
import { useImage } from "../../hook/profile/useImage";
import { useLazyLoading } from "../../hook";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiBadge-badge": {
      height: "30px",
      width: "30px",
      fontSize: "1rem",
      borderRadius: "15px",
      color: "#ffffff",
      backgroundColor: "#007bff",
    },
  },
}));

export default function PeopleBox(props) {
  const classes = useStyles();
  const data = props.data;
  const [imgState, setImgState] = useState("");
  const imgPending = useImage(imgState, setImgState, data.userId);
  const lazy = useLazyLoading();

  return (
    <div id="PeopleBoxCard" className={classes.card}>
      <Link
        to={{
          pathname: `${props.url}`,
        }}
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <Badge badgeContent={String(data.grade)} className={classes.root}>
          <Card>
            <div className="people-img">
              <img
                ref={lazy.target}
                data-src={imgState.imgUrl}
                width="100%"
                object-fit="contain"
                alt="people img"
              />
            </div>
            <CardBody>
              <div id="card-title">
                <CardTitle>{data.userId}</CardTitle>
              </div>

              <CardText id="card-text">
                {data.stack === null && " "}
                {data.stacks[0] && (
                  <Stack color="secondary" pill>
                    # {data.stacks[0]}{" "}
                  </Stack>
                )}
              </CardText>
            </CardBody>
          </Card>
        </Badge>
      </Link>
    </div>
  );
}
