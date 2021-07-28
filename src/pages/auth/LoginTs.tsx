import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import { Layout } from "../../components";
import { useLoginEffect } from "../../hook/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  title: {
    textAlign: "center",
  },
  formWrap: {
    maxWidth: "280px",
    margin: "auto",
    marginTop: "50px",
  },
  registInput: {
    width: "100%",
  },
}));

function LoginPage() {
  const classes = useStyles();
  const {loading, user, onFinish, onFinishFailed, handleInput} = useLoginEffect();

  return (
    <Layout>
      <Typography variant="h5" className={classes.title}>
        Login
      </Typography>
      <div className={classes.formWrap}>
        <form className={classes.root} onSubmit={onFinish}>
          <FormControl variant="filled" className={classes.registInput}>
            <InputLabel htmlFor="userId" shrink>
              UserId
            </InputLabel>
            <Input
              id="userId"
              name="userId"
              type="text"
              value={user.userId}
              onChange={handleInput}
            />
          </FormControl>
          <FormControl variant="filled" className={classes.registInput}>
            <InputLabel htmlFor="password" shrink>
              Password
            </InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleInput}
            />
          </FormControl>
          <div>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || user.userId === "" || user.password === ""}
              color="primary"
            >
              로그인
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default LoginPage;
