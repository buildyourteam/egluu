/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Layout } from "../../components";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import { register } from "../../reducers/Register";
import { useRegisterData, useRegisterLoading } from "../../hooks";

const useStyles = makeStyles(theme => ({
  panel: {
    margin: "0px",
    color: green
  }
}));

const RegisterPage = () => {
  const classes = useStyles();
  const [{ loadState }, setLoadState, dispatch] = useRegisterLoading();
  const [{ registerState }, setRegisterState] = useRegisterData();

  const handleInput = e => {
    e.persist();
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    console.log("저장하기");
    await dispatch(register(registerState));
  };

  return (
    <div>
      <Layout hasFooter>
        <Grid container>
          <Grid item xs={12} className={classes.panel}>
            <Typography>Register</Typography>
          </Grid>
          <Grid item xs={12} className={classes.panel}>
            <TextField
              name="name"
              value={registerState.name}
              onChange={handleInput}
              label="name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className={classes.panel}>
            <TextField
              name="userId"
              value={registerState.userId}
              onChange={handleInput}
              label="userId"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className={classes.panel}>
            <TextField
              name="userEmail"
              value={registerState.userEmail}
              onChange={handleInput}
              label="userEmail"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} className={classes.panel}>
            <TextField
              name="password"
              value={registerState.password}
              onChange={handleInput}
              label="password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12} className={classes.panel}>
            <Button onClick={handleSave}>저장하기</Button>
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
};

export default RegisterPage;
