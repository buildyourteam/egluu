import React from "react";
import { Layout } from "../../components";
import { useRegisterEffect } from "../../hook/auth";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  title: {
    textAlign: "center"
  },
  formWrap: {
    maxWidth: "400px",
    margin: "auto",
    marginTop: "50px",
  },
  registInput: {
    width: "100%"
  }
}));

const RegisterPage = () => {
    const classes = useStyles();
  const {loading, register, onFinish, onFinishFailed, handleInput} = useRegisterEffect();
  const isFilled = register.userId === "" || register.userEmail === "" || register.name === ""|| register.password === "";
  return (
    <Layout>
      <Typography variant="h5" className={classes.title}>
        Create your Account
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
              value={register.userId}
              onChange={handleInput}
            />
          </FormControl>
          <FormControl variant="filled" className={classes.registInput}>
            <InputLabel htmlFor="userEmail" shrink>
              UserEmail
            </InputLabel>
            <Input
              id="userEmail"
              name="userEmail"
              type="email"
              value={register.userEmail}
              onChange={handleInput}
            />
          </FormControl>
          <FormControl variant="filled" className={classes.registInput}>
            <InputLabel htmlFor="password" shrink>
              Name
            </InputLabel>
            <Input
              id="name"
              name="name"
              type="name"
              value={register.name}
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
              value={register.password}
              onChange={handleInput}
            />
          </FormControl>
          <div>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || isFilled}
              color="primary"
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;
