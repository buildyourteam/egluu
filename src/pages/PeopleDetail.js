import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MuiCircularProgress from "@material-ui/core/CircularProgress";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import ReactMarkdown from "react-markdown/with-html";
import TextField from "@material-ui/core/TextField";
import { usePeopleDetailLoading, usePeopleDetailData } from "../hooks";
import { setPeopleDetail } from "../reducers/People";
import Grid from "@material-ui/core/Grid";
import { ImgInput, Layout, TeamBox } from "../components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { green } from "@material-ui/core/colors";
import baseImg from "./unnamed.jpg";

const useStyles = makeStyles(theme => ({
  text: {
    color: "#000000"
  },
  userId: {
    opacity: 0.5
  }
}));

const PeoplePageDetail = () => {
  const classes = useStyles();
  const [{ loadState }, setLoadState, dispatch] = usePeopleDetailLoading();
  const [
    { peopleDetailState, open },
    setPeopleDetailState,
    setOpen
  ] = usePeopleDetailData();

  const handleInput = e => {
    e.persist();
    setPeopleDetailState({
      ...peopleDetailState,
      [e.target.name]: e.target.value
    });
  };
  const id = window.sessionStorage.getItem("id");

  // const handleInputMember = e => {
  //   setPeopleDetailState({
  //     ...peopleDetailState,
  //     needMember: {
  //       [e.target.userName]: e.target.value
  //     }
  //   });
  // };

  const handleSave = async () => {
    setOpen({ ...open, change: !open.change });
    await dispatch(setPeopleDetail(peopleDetailState));
  };

  return (
    <Layout hasFooter>
      <div>
        <AppBar
          position="static"
          color="inherit"
          style={{ boxShadow: "none", textAlign: "center" }}
        >
          <Toolbar style={{ textAlign: "center" }}>
            {/* <div>
            <img src="fds" alt="" />
          </div> */}
          </Toolbar>
        </AppBar>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Card>
              {open.change ? (
                <div>
                  <ImgInput
                    state={peopleDetailState}
                    setState={setPeopleDetailState}
                  />
                  {/* userName */}
                  <TextField
                    name="userName"
                    value={peopleDetailState.userName}
                    onChange={handleInput}
                    fullWidth
                    label="userName"
                  />
                  {/* role */}
                  <TextField
                    name="role"
                    value={peopleDetailState.role}
                    onChange={handleInput}
                    fullWidth
                    label="role"
                  />
                  {/* stacks */}
                  {/* <TextField
                    name="stacks"
                    value={peopleDetailState.stacks}
                    onChange={handleInput}
                    fullWidth
                    label="stacks"
                  /> */}
                  {/* contact */}
                  <TextField
                    name="contact"
                    value={peopleDetailState.contact}
                    onChange={handleInput}
                    fullWidth
                    label="contact"
                    multiline
                  />
                  {/* area */}
                  <TextField
                    name="area"
                    value={peopleDetailState.area}
                    onChange={handleInput}
                    fullWidth
                    label="area"
                  />
                  {/* description */}
                  <TextField
                    name="description"
                    value={peopleDetailState.description}
                    onChange={handleInput}
                    fullWidth
                    label="description"
                    multiline
                  />
                  <ReactMarkdown
                    source={peopleDetailState.description}
                    escapeHtml={false}
                  />

                  <Button onClick={handleSave}>저장하기</Button>
                </div>
              ) : (
                <div>
                  <div
                    style={{ backgroundColor: "#000000", position: "relative" }}
                  >
                    <div>
                      {typeof peopleDetailState.imgUrl !== "string" ? (
                        <img
                          src=""
                          //src={peopleDetailState.imgUrl.url}
                          alt="이미지 에러"
                          align="center"
                          height="30%"
                          width="100%"
                          style={{ display: "block", hover: 1 }}
                          onError="this.src='./unnamed.jpg'"
                        />
                      ) : (
                        <div>
                          <img
                            //src="https://lh3.googleusercontent.com/proxy/cBZU_F1ulNXIOwd2hj1Tu_d8lCiKtM5IS4eDbf3Bf9M5yqzez0BgRVdULPgifDMMBzmOAo5SstJYbsP52OlBcADaGbKkJbcqtQrc3bjsMJ3lZNRLUs_iEA"
                            //src={baseImg}
                            src={peopleDetailState.imgUrl}
                            alt="이미지 에러"
                            align="center"
                            height="30%"
                            width="100%"
                            //onError={(this.src = baseImg)}
                            style={{
                              display: "block",

                              hover: 1
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{ margin: "5%", position: "relative", top: "0vh" }}
                  >
                    {/* userName */}
                    <Typography variant="h4" className={classes.text}>
                      {peopleDetailState.userName}
                    </Typography>
                    {/* userId */}
                    <Typography variant="h5" className={classes.userId}>
                      {id}
                    </Typography>
                    <br />
                    {/* role */}
                    <Typography variant="h6" className={classes.text}>
                      {peopleDetailState.role}
                    </Typography>
                    {/* stacks */}
                    <Typography variant="h6" className={classes.text}>
                      #ReactJs #Javascript
                    </Typography>
                    {/* area */}
                    <Typography variant="h6" className={classes.text}>
                      area : {peopleDetailState.area}
                    </Typography>
                    {/* level */}
                    <Typography variant="h6" className={classes.text}>
                      Lev.{peopleDetailState.level}
                    </Typography>
                    {/* contact */}
                    <Typography variant="h6">
                      contact : {peopleDetailState.contact}
                    </Typography>
                    {/* description */}
                    <Typography variant="h6">개인정보 입니다.</Typography>
                    <ReactMarkdown
                      source={peopleDetailState.description}
                      escapeHtml={false}
                    />
                    {/* <Typography
                      className={classes.stack}
                      variant="body2"
                      component="p"
                      color="textPrimary"
                    >
                      {peopleDetailState.technicalStack.map((value, i) => (
                <span>#{value} </span>
              ))}
                    </Typography> */}
                  </div>

                  <div
                    style={{ margin: "5%", position: "relative", top: "0vh" }}
                  ></div>

                  <Dialog open={loadState.open}>
                    <MuiDialogContent
                      style={{
                        background: "white",
                        width: "160px",
                        minHeight: "80px",
                        textAlign: "center"
                      }}
                    >
                      <MuiCircularProgress
                        style={{ width: "20%", height: "20%" }}
                      />
                      <div style={{ marginTop: "12px" }}>{loadState.text}</div>
                      <Button
                        onClick={() => {
                          setLoadState({ ...loadState, open: false });
                        }}
                      >
                        닫기
                      </Button>
                    </MuiDialogContent>
                  </Dialog>
                  <Button
                    onClick={() => setOpen({ ...open, change: !open.change })}
                  >
                    수정하기
                  </Button>
                </div>
              )}
            </Card>
            <br />
          </Grid>

          {peopleDetailState.projects.map((value, i) => (
            <Grid xs={8} sm={4}>
              <span
                style={{ margin: "20px", cursor: "pointer" }}
                id={value.title + i}
                onClick={() =>
                  (window.location = `/projects/${value.projectId}`)
                }
              >
                <TeamBox state={value} />
              </span>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default PeoplePageDetail;
