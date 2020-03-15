/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  appbar: {
    margin: "0px"
  }
}));

const RegisterPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography>registerpage</Typography>
    </div>
  );
};

export default RegisterPage;
