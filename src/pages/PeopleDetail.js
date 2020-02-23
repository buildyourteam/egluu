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
import { ImgInput } from "../components";
import { setPeopleDetail } from "../reducers/People";

const useStyles = makeStyles(theme => ({
  text: {
    color: "#ffffff"
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
  console.log(peopleDetailState);

  const handleInput = e => {
    e.persist();
    setPeopleDetailState({
      ...peopleDetailState,
      [e.target.name]: e.target.value
    });
  };

  // const handleInputMember = e => {
  //   setPeopleDetailState({
  //     ...peopleDetailState,
  //     needMember: {
  //       [e.target.name]: e.target.value
  //     }
  //   });
  // };

  const handleSave = async () => {
    setOpen({ ...open, change: !open.change });
    await dispatch(setPeopleDetail(peopleDetailState));
  };

  return (
    <div>
      <AppBar
        position="static"
        color="inherit"
        style={{ boxShadow: "none", textAlign: "center" }}
      >
        <Toolbar style={{ textAlign: "center" }}>
          <Typography variant="h6" align="center" display="inline">
            ESKIMO
          </Typography>
          <Button onClick={() => setOpen({ ...open, change: !open.change })}>
            수정하기
          </Button>
          <div>
            <img src="fds" alt="" />
          </div>
        </Toolbar>
      </AppBar>
      {open.change ? (
        <div>
          <ImgInput state={peopleDetailState} setState={setPeopleDetailState} />
          <TextField
            name="name"
            value={peopleDetailState.name}
            onChange={handleInput}
            fullWidth
            label="이름"
          />
          <TextField
            name="area"
            value={peopleDetailState.area}
            onChange={handleInput}
            fullWidth
            label="활동 범위"
          />
          <TextField
            name="contact"
            value={peopleDetailState.contact}
            onChange={handleInput}
            fullWidth
            label="연락처"
            multiline
          />
          <ReactMarkdown
            source={peopleDetailState.peopleDescription}
            escapeHtml={false}
          />
          {/* <div>
            개발자 :
            <TextField
              name="peopleDescription"
              type="number"
              value={peopleDetailState.needMember.developer}
              onChange={handleInputMember}
            />
          </div>
          <div>
            기획자 :
            <TextField
              name="peopleDescription"
              type="number"
              value={peopleDetailState.needMember.planner}
              onChange={handleInputMember}
            />
          </div>
          <div>
            디자이너 :
            <TextField
              name="peopleDescription"
              type="number"
              value={peopleDetailState.needMember.designer}
              onChange={handleInputMember}
            />
          </div>
          <div>
            기타 :
            <TextField
              name="peopleDescription"
              type="number"
              value={peopleDetailState.needMember.etc}
              onChange={handleInputMember}
            />
          </div> */}
          <Button onClick={handleSave}>저장하기</Button>
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: "#000000", position: "relative" }}>
            <div>
              {typeof peopleDetailState.imgUrl !== "string" ? (
                <img
                  src={peopleDetailState.imgUrl.url}
                  alt="이미지 에러"
                  align="center"
                  height="30%"
                  width="100%"
                  style={{ display: "block", opacity: "0.5", hover: 1 }}
                />
              ) : (
                <div>
                  <img
                    src={peopleDetailState.imgUrl}
                    alt="이미지 에러"
                    align="center"
                    height="30%"
                    width="100%"
                    style={{ display: "block", opacity: "0.5", hover: 1 }}
                  />
                </div>
              )}
            </div>
          </div>
          <div style={{ margin: "5%", position: "relative", top: "-40vh" }}>
            <Typography variant="h1" className={classes.text}>
              {peopleDetailState.name}
            </Typography>
            <Typography variant="h3" className={classes.text}>
              Lev.{peopleDetailState.level}
            </Typography>
          </div>
          <div style={{ margin: "5%", position: "relative", top: "-30vh" }}>
            <Typography variant="h3">개인정보</Typography>
            {/* <ReactMarkdown
              source={peopleDetailState.contact}
              escapeHtml={false}
            /> */}
            <Typography variant="h6">
              레벨 : {peopleDetailState.level}
            </Typography>
            <Typography variant="h6">
              연락처 : {peopleDetailState.contact}
            </Typography>
            <Typography
              className={classes.stack}
              variant="body2"
              component="p"
              color="textPrimary"
            >
              {/* {peopleDetailState.technicalStack.map((value, i) => (
                <span>#{value} </span>
              ))} */}
            </Typography>
          </div>
          <Typography variant="h6">
            팀원 현황 ... 데이터 추가후 추가예정
          </Typography>
          <Dialog open={loadState.open}>
            <MuiDialogContent
              style={{
                background: "white",
                width: "160px",
                minHeight: "80px",
                textAlign: "center"
              }}
            >
              <MuiCircularProgress style={{ width: "20%", height: "20%" }} />
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
        </div>
      )}
      <footer
        style={{
          backgroundColor: "#eeeeee",
          height: "100px",
          textAlign: "center"
        }}
      >
        <Typography variant="h4" align="center" style={{ padding: "10px" }}>
          ESKIMO
        </Typography>
        <Typography variant="h6" align="center">
          문의 : manzi@kakao.com
        </Typography>
      </footer>
    </div>
  );
};

export default PeoplePageDetail;
