/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Layout } from '../../components';
import { login } from '../../reducers/Login';

import { useLoginData, useLoginLoading } from '../../hooks';

const useStyles = makeStyles(theme => ({
  panel: {
    margin: '0px',
    color: green,
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [{ loadState }, setLoadState, dispatch] = useLoginLoading();
  const [{ loginState }, setLoginState] = useLoginData();

  const handleInput = e => {
    e.persist();
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    console.log('저장하기');
    await dispatch(login(loginState));
    history.replace('/');
    // history.();
  };

  return (
    <div>
      <Layout hasFooter>
        <Grid container>
          <Grid item xs={12} className={classes.panel}>
            <Typography>Login</Typography>
          </Grid>
          <Grid item xs={12} className={classes.panel}>
            <TextField
              name="id"
              value={loginState.id}
              onChange={handleInput}
              label="ID"
              variant="outlined"
              autoComplete="current-id"
            />
          </Grid>
          <Grid item xs={12} className={classes.panel}>
            <TextField
              name="password"
              value={loginState.password}
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

export default withRouter(LoginPage);
